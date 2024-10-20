import { CSSProperties } from "react";
import { ComponentOptions, DsComponent, HTMLProps } from "./types";
import { createComponent } from "./createComponent";

// Create the proxy with correct typings for the intrinsic elements
export const dsProxy = new Proxy(
  {},
  {
    get:
      (_, tag: keyof JSX.IntrinsicElements) =>
      <T extends object, K extends keyof JSX.IntrinsicElements = typeof tag>(
        options?: ComponentOptions<T> | string | ((props: HTMLProps<T, K>) => string),
        css?: ((props: HTMLProps<T, K>) => CSSProperties) | CSSProperties,
      ) =>
        createComponent<T, K>(tag as K, options, css),
  },
) as DsComponent
