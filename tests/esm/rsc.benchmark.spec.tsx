import "@testing-library/jest-dom";
import React from "react";
import { render } from "@testing-library/react";
import { rsc } from "../../dist/index";
import stressConfig from "../stress.config";

describe("rsc stress benchmark", () => {
  const NUM_COMPONENTS = stressConfig.elementCount;

  it(`rsc creation`, () => {
    const start = performance.now();

    const RscDiv = rsc.div`bg-red p-4`;
    const components = Array.from({ length: NUM_COMPONENTS }, (_, i) => (
      <RscDiv key={i} />
    ));

    const { container } = render(<>{components}</>);
    const end = performance.now();

    expect(container.firstChild).toBeTruthy();
    console.log(`${NUM_COMPONENTS}x rsc base: ${(end - start).toFixed(2)} ms`);
  });

  it(`react creation`, () => {
    const start = performance.now();

    const ReactDiv = (props: { className?: string }) => (
      <div className={props.className} />
    );
    const components = Array.from({ length: NUM_COMPONENTS }, (_, i) => (
      <ReactDiv key={i} className="bg-red p-4" />
    ));

    const { container } = render(<>{components}</>);
    const end = performance.now();

    expect(container.firstChild).toBeTruthy();
    console.log(`${NUM_COMPONENTS}x react base: ${(end - start).toFixed(2)} ms`);
  });

  it(`rsc.extend`, () => {
    const start = performance.now();

    interface BaseProps {
      $isActive: boolean;
    }

    const BaseButton = rsc.button<BaseProps>`
      ${(p) => (p.$isActive ? "bg-active" : "bg-inactive")}
    `;

    const ExtendedButton = rsc.extend(BaseButton)<{ $isDisabled?: boolean }>`
      ${(p) => (p.$isDisabled ? "opacity-50" : "opacity-100")}
      ${(p) => (p.$isActive ? "text-bold" : "text-normal")}
    `;

    const components = Array.from({ length: NUM_COMPONENTS }, (_, i) => (
      <ExtendedButton
        key={i}
        $isActive={i % 2 === 0}
        $isDisabled={i % 3 === 0}
      />
    ));

    const { container } = render(<>{components}</>);
    const end = performance.now();

    expect(container.firstChild).toBeTruthy();
    console.log(`${NUM_COMPONENTS}x rsc base + rsc.extend: ${(end - start).toFixed(2)} ms`);
  });

  it(`react prop nesting`, () => {
    const start = performance.now();

    // Mimic the behavior of BaseButton and ExtendedButton
    const BaseButton = ({
      $isActive,
      className,
    }: {
      $isActive: boolean;
      className?: string;
    }) => {
      const baseClass = $isActive ? "bg-active" : "bg-inactive";
      return <button className={`${baseClass} ${className || ""}`.trim()} />;
    };

    const ExtendedButton = ({
      $isActive,
      $isDisabled,
      className,
    }: {
      $isActive: boolean;
      $isDisabled?: boolean;
      className?: string;
    }) => {
      const baseClass = $isActive ? "bg-active" : "bg-inactive";
      const extendedClass = [
        baseClass,
        $isDisabled ? "opacity-50" : "opacity-100",
        $isActive ? "text-bold" : "text-normal",
        className || "",
      ]
        .filter(Boolean)
        .join(" ")
        .trim();
      return <button className={extendedClass} />;
    };

    const components = Array.from({ length: NUM_COMPONENTS }, (_, i) => (
      <ExtendedButton
        key={i}
        $isActive={i % 2 === 0}
        $isDisabled={i % 3 === 0}
      />
    ));

    const { container } = render(<>{components}</>);
    const end = performance.now();

    expect(container.firstChild).toBeTruthy();
    console.log(`${NUM_COMPONENTS}x react extend: ${(end - start).toFixed(2)} ms`);
  });
});
