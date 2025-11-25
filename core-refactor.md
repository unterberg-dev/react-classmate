# Core Package Refactor Plan

## Objectives
- Decouple the generic class-building runtime from React so adapters for Solid, Vue, etc. only need to implement view-library specifics.
- Centralize shared factories (`base`, `extend`, `variants`), helpers (`createVariantMap`, `applyLogicHandlers`), and metadata (`domElements`) inside `@classmate/core`.
- Preserve the existing public surface (`import rc from "@classmate/react"`) by keeping the adapter packages as the only published entry-points.
- Keep extensibility at the center: the core should be framework-agnostic, composable, and ready for future adapters without code duplication.

## Current Snapshot
- `packages/react/src` mixes cross-cutting logic (style factories, logic handler pipeline, DOM element registry) with React-specific rendering (`forwardRef`, `createElement`, JSX typing).
- The `core` package is empty apart from `package.json`; nothing is exported yet.
- `domElements.ts` and the `factory` directory (base, extend, variants) are key candidates for core because they do not fundamentally depend on React.
- `solid` package exists but is currently a placeholder, so we have a greenfield to define the adapter contract before porting behavior.

## Target Architecture

| Layer | Responsibility | Notes |
| --- | --- | --- |
| `@classmate/core` (private) | Owns runtime abstractions: interpolation handling, logic handlers, DOM registry, variant utilities, type helpers, adapter interfaces. | No direct dependency on React/Solid. Ships JS + .d.ts that adapters consume. |
| Adapter packages (`@classmate/react`, `@classmate/solid`, …) | Implement `ClassmateAdapter` interface (how to create components, merge class names/styles, normalize props). Re-export a bound `rc` factory configured with their adapter. | Users install only one adapter package. |
| Docs/demo packages | Consume adapter packages just like end-users. | Acts as integration tests. |

Core never ships directly to users; adapters remain the user-facing packages.

## Core Building Blocks

### 1. Adapter Contract
- Define a `ClassmateAdapter` interface inside `packages/core/src/adapter.ts` describing how the core asks a library to render components:
  - `type ElementToken` (opaque handle for the underlying library).
  - `createComponent(options)` -> returns a `ClassmateComponent<P>`.
  - Hooks for `mergeClassNames`, `mergeStyles`, `filterProps`, `attachMetadata`.
- Provide helper types for adapters to extend their intrinsic element map (React uses `JSX.IntrinsicElements`, Solid uses `JSX.IntrinsicElements` from `solid-js`).
- Expose a small `createRuntime(adapter: ClassmateAdapter)` function that returns the `rc` proxy configured for the adapter.

### 2. Factory Implementations
- Move `packages/react/src/factory/*.ts` into `packages/core/src/factory/` and rewrite them to consume the adapter contract instead of React APIs directly.
- Extract interpolation, style collection, and logic handler execution into utility modules so they can be re-used across the base/extend/variants builders.
- Keep display name computation generic (pass adapter-provided formatter if needed).
- Provide a single set of builder exports (`createBaseComponent`, `createExtendedComponent`, `createVariantsComponent`) from core so every adapter simply injects its own `createElement` implementation. React, Solid, etc. should not maintain their own copies of the factory logic.

### 3. Helpers & Metadata
- Relocate `packages/react/src/util/domElements.ts` (plus `AllowedTags` type) into `packages/core/src/dom/elements.ts`. Expose typed helpers to adapters.
- Relocate `packages/react/src/util/applyLogicHandlers.ts` and `helper/createVariantMap.ts` into `/core`. Ensure no React types remain.
- Keep Tailwind-specific helpers (e.g., `twMerge`) inside adapters; core should accept a `mergeClassNames` function provided by the adapter.

### 4. Types & Shared Utilities
- Define shared types (`Interpolation`, `StyleDefinition`, `VariantsConfig`, `LogicHandler`, `RcBaseComponent` analog) under `packages/core/src/types`.
- Provide adapter-specific augmentation hooks so React and Solid packages can extend/augment the `RcComponent` type with their JSX namespace.
- Consider exposing a `createClassmateFactory(adapterConfig)` helper that returns `{ rc, createVariantMap, domElements }`.

### 5. Build & Distribution
- Configure `packages/core/tsconfig.json`, `tsup` (or `tsc`) build script to emit ESM + types consumed by adapters.
- Mark the package as `"private": true` but still build it via workspaces so adapters import compiled output (`@classmate/core/dist` or source via TS path mapping).

## Adapter Responsibilities After Extraction
- Supply adapter-level options (React uses `forwardRef`, Solid uses `splitProps`, etc.).
- House runtime dependencies (`react`, `solid-js`, `tailwind-merge`, etc.).
- Implement `createAdapterRuntime` that wires the core factory to the adapter specifics and re-exports `rc`, helpers, and React/Solid-specific hooks (`useClassmate`, etc.).
- Keep adapter-exclusive APIs (e.g., `useClassmate.ts` for React) colocated.

## Migration Plan

### Phase 0 – Preparation
1. Align TS project references so adapters can import from `@classmate/core/dist`.
2. Ensure lint/build scripts run per package (update root `package.json` if needed).
3. Add baseline tests (smoke tests for `rc.div` + `variants`) to lock behavior pre-refactor.

### Phase 1 – Bootstrap Core Package
1. Create `packages/core/src` with folders: `adapter`, `factory`, `logic`, `types`, `dom`, `helpers`.
2. Add `tsconfig.json` + `tsup.config.ts` mirroring React package but without React deps.
3. Export a temporary `createClassmateRuntime` that currently re-implements existing logic (will wire files in later phases).

### Phase 2 – Move Metadata & Pure Utilities
1. Move `packages/react/src/util/domElements.ts` → `packages/core/src/dom/elements.ts`; export `domElements` & `AllowedTags`.
2. Move `applyLogicHandlers` and `createVariantMap` into core (rename to `logic/applyHandlers.ts` & `helpers/createVariantMap.ts`). Update React imports to consume them from `@classmate/core`.
3. Ensure moved files use generic types from `core/types` (not React types).

### Phase 3 – Extract Factory Logic
1. Refactor `factory/base.ts`, `factory/extend.ts`, `factory/variants.ts` to compile inside core using abstraction only:
   - Replace direct React typings (`JSX`) with adapter-provided `IntrinsicElementsMap` generic.
   - Accept `adapter: ClassmateAdapter` in their signatures to delegate rendering (`createElement`, `forwardRef`, class/style merging).
2. Move `createReactElement.ts` logic into core as a generic `createAdapterComponent` that uses adapter hooks.
3. Update React package to instantiate the adapter implementation (providing `forwardRef`, `createElement`, `tailwind-merge`, prop filtering).
4. Remove duplicate logic from React package—only the adapter config + React-only helpers remain.

### Phase 4 – Rebuild Adapter Surface
1. Update `packages/react/src/rc.ts` to import `createRuntime` (or similar) from core and pass the React adapter config.
2. Re-export helper utilities from React package if necessary (e.g., `createVariantMap`).
3. Keep React-specific hooks (`useClassmate.ts`) unchanged but ensure they import shared types from core.
4. Introduce a similar adapter skeleton inside `packages/solid` (even if partially implemented) to validate the abstraction.

### Phase 5 – Verification & Cleanup
1. Run adapter test suites + docs build to verify there are no regressions.
2. Document the new architecture in `README.md` + package READMEs, explaining the adapter-driven approach and internal core package.
3. Update contribution docs to explain how to add a new adapter (steps: implement adapter contract, create package, add tests).

## Open Questions / Decisions
- Should adapters import from core source (TS path) or compiled output? (Compiled output recommended to avoid circular tsconfig issues.)
- Do we keep tailwind-specific utilities (like `twMerge`) optional so adapters can opt-out? (Expose a default `mergeClassNames` fallback.)
- What is the minimal metadata React/Solid components must expose (`__rc*` fields) for `extend` to work? Decide whether to keep them or replace with a shared `ComponentDescriptor`.

Resolving these questions early will prevent rework once the Solid adapter is implemented.
