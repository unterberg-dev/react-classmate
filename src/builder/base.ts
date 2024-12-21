import { RcBaseComponent, Interpolation, MergeProps, InputComponent } from "../types";
import createReactElement from "../util/createReactElement";
import { JSX } from "react";

/**
 * Core function to create styled React components with dynamic class names.
 */
const createBaseComponent = <
  T extends object,
  E extends keyof JSX.IntrinsicElements | InputComponent,
>(
  tag: E,
  strings: TemplateStringsArray,
  interpolations: Interpolation<MergeProps<E, T>>[],
): RcBaseComponent<MergeProps<E, T>> => {
  // Define the function to compute class names
  const computeClassName = (props: MergeProps<E, T>) => {
    const result = strings
      .map((str, i) => {
        const interp = interpolations[i];
        return typeof interp === "function" ? str + interp(props) : str + (interp ?? "");
      })
      .join("")
      .replace(/\s+/g, " ")
      .trim();

    return result;
  };

  // create
  const label = `Styled(${typeof tag === "string" ? tag : "Component"})`;
  return createReactElement(tag, computeClassName, label);
};

export default createBaseComponent;
