// createExtendedComponent.ts

import { RcBaseComponent, Interpolation, InputComponent } from "../types";
import createReactElement from "../util/createReactElement";

/**
 * Create an extended component builder.
 * Merges the base component’s computed class names with the new interpolations.
 */
function createExtendedComponent<T extends object>(
  baseComponent: RcBaseComponent<any> | InputComponent,
  strings: TemplateStringsArray,
  interpolations: Interpolation<T>[],
): RcBaseComponent<T> {
  // Retrieve any existing computeClassName from the base
  const baseComputeClassName =
    (baseComponent as RcBaseComponent<any>).__rcComputeClassName || (() => "");

  // Retrieve the underlying tag or component
  const baseTag = (baseComponent as RcBaseComponent<any>).__rcTag || baseComponent;

  // Our extended compute function
  const extendedComputeClassName = (props: T) => {
    const baseClassName = baseComputeClassName(props);

    // Build the extended portion from the strings + interpolations
    const extendedClassName = strings
      .map((str, i) => {
        const interp = interpolations[i];
        return typeof interp === "function" ? str + interp(props) : str + (interp ?? "");
      })
      .join("")
      .replace(/\s+/g, " ")
      .trim();

    return [baseClassName, extendedClassName].filter(Boolean).join(" ");
  };

  // Build the final extended component
  const label = `Extended(${(baseComponent as RcBaseComponent<any>).displayName || "Component"})`;

  return createReactElement(baseTag, extendedComputeClassName, label) as RcBaseComponent<T>;
}

export default createExtendedComponent;
