import "@testing-library/jest-dom";
import React, { InputHTMLAttributes } from "react";
import { render } from "@testing-library/react";
import rsc from "../../src/index";

describe("rsc stress benchmark", () => {
  const NUM_COMPONENTS = 500;

  it(`rsc benchmark warmup`, () => {
    const start = performance.now();

    const RscDiv = rsc.div`bg-red p-4`;
    const ReactDiv = (props: { className?: string }) => <div className={props.className} />;

    // alternate between rsc and react components
    const components = Array.from({ length: NUM_COMPONENTS }, (_, i) =>
      i % 2 === 0 ? <RscDiv key={i} /> : <ReactDiv key={i} className="bg-red p-4" />
    );

    const { container } = render(<>{components}</>);
    const end = performance.now();

    expect(container.firstChild).toBeTruthy();
    console.log(`000) ${NUM_COMPONENTS}x rsx and react elements - warmup: ${(end - start).toFixed(2)} ms`);
  });

  it(`rsc creation`, () => {
    const start = performance.now();

    const RscDiv = rsc.div`bg-red p-4`;
    const components = Array.from({ length: NUM_COMPONENTS }, (_, i) => <RscDiv key={i} />);

    const { container } = render(<>{components}</>);
    const end = performance.now();

    expect(container.firstChild).toBeTruthy();
    console.log(`A) ${NUM_COMPONENTS}x rsc base: ${(end - start).toFixed(2)} ms`);
  });

  it(`react creation`, () => {
    const start = performance.now();

    const ReactDiv = (props: { className?: string }) => <div className={props.className} />;
    const components = Array.from({ length: NUM_COMPONENTS }, (_, i) => (
      <ReactDiv key={i} className="bg-red p-4" />
    ));

    const { container } = render(<>{components}</>);
    const end = performance.now();

    expect(container.firstChild).toBeTruthy();
    console.log(`A) ${NUM_COMPONENTS}x react base: ${(end - start).toFixed(2)} ms`);
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
      <ExtendedButton key={i} $isActive={i % 2 === 0} $isDisabled={i % 3 === 0} />
    ));

    const { container } = render(<>{components}</>);
    const end = performance.now();

    expect(container.firstChild).toBeTruthy();
    console.log(`B) ${NUM_COMPONENTS}x rsc base + rsc.extend: ${(end - start).toFixed(2)} ms`);
  });

  it(`react prop nesting`, () => {
    const start = performance.now();

    // Mimic the behavior of BaseButton and ExtendedButton
    const BaseButton = ({ isActive, className }: { isActive: boolean; className?: string }) => {
      const baseClass = isActive ? "bg-active" : "bg-inactive";
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
      return <BaseButton isActive className={extendedClass} />;
    };

    const components = Array.from({ length: NUM_COMPONENTS }, (_, i) => (
      <ExtendedButton key={i} $isActive={i % 2 === 0} $isDisabled={i % 3 === 0} />
    ));

    const { container } = render(<>{components}</>);
    const end = performance.now();

    expect(container.firstChild).toBeTruthy();
    console.log(`B) ${NUM_COMPONENTS}x react extend: ${(end - start).toFixed(2)} ms`);
  });

  it(`rsc extend variants`, () => {
    const start = performance.now();

    interface ButtonProps extends InputHTMLAttributes<HTMLInputElement> {
      $severity: "info" | "warning" | "error";
      $isActive?: boolean;
    }

    const Alert = rsc.input.variants<ButtonProps>({
      base: "p-4",
      variants: {
        $severity: {
          info: (p) => `bg-blue-100 text-blue-800 ${p.$isActive ? "shadow-lg" : ""}`,
        },
      },
    });

    const ExtendedButton = rsc.extend(Alert)<{ $test: boolean }>`
      ${(p) => (p.$test ? "bg-green-100 text-green-800" : "")}
    `;

    const components = Array.from({ length: NUM_COMPONENTS }, (_, i) => (
      <ExtendedButton key={i} type="submit" $severity="info" $isActive $test />
    ));

    const { container } = render(<>{components}</>);
    const end = performance.now();

    expect(container.firstChild).toBeTruthy();
    console.log(`C) ${NUM_COMPONENTS}x rsc variants: ${(end - start).toFixed(2)} ms`);
  });
});
