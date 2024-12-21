const React = require("react");
const rc = require("../../dist/index.cjs.js");
const { render } = require("@testing-library/react");

describe("rc (CJS) stress benchmark", () => {
  const NUM_COMPONENTS = 50;

  it(`rc (cjs) benchmark warmup`, () => {
    const start = performance.now();

    const RcDiv = rc.div`bg-red p-4`;
    const ReactDiv = (props) => <div className={props.className} />;

    // alternate between rc and react components
    const components = Array.from({ length: NUM_COMPONENTS }, (_, i) =>
      i % 2 === 0 ? <RcDiv key={i} /> : <ReactDiv key={i} className="bg-red p-4" />
    );

    const { container } = render(<>{components}</>);
    const end = performance.now();

    expect(container.firstChild).toBeTruthy();
    console.log(`000) ${NUM_COMPONENTS}x rsx and react elements - warmup: ${(end - start).toFixed(2)} ms`);
  });

  it(`rc creation`, () => {
    const start = performance.now();

    const RcDiv = rc.div`bg-red p-4`;
    const components = Array.from({ length: NUM_COMPONENTS }, (_, i) => (
      <RcDiv key={i} />
    ));

    const { container } = render(<>{components}</>);
    const end = performance.now();

    expect(container.firstChild).toBeTruthy();
    console.log(
      `cjs: ${NUM_COMPONENTS}x rc base: ${(end - start).toFixed(2)} ms`
    );
  });

  it(`react creation`, () => {
    const start = performance.now();

    const ReactDiv = (props) => <div className={props.className} />;
    const components = Array.from({ length: NUM_COMPONENTS }, (_, i) => (
      <ReactDiv key={i} className="bg-red p-4" />
    ));

    const { container } = render(<>{components}</>);
    const end = performance.now();

    expect(container.firstChild).toBeTruthy();
    console.log(
      `cjs: ${NUM_COMPONENTS}x react base: ${(end - start).toFixed(2)} ms`
    );
  });

  it(`rc.extend`, () => {
    const start = performance.now();

    const BaseButton = rc.button`
      ${(p) => (p.$isActive ? "bg-active" : "bg-inactive")}
    `;

    const ExtendedButton = rc.extend(BaseButton)`
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
    console.log(
      `cjs: ${NUM_COMPONENTS}x rc base + rc.extend: ${(end - start).toFixed(2)} ms`
    );
  });

  it(`react prop nesting`, () => {
    const start = performance.now();

    // Mimic the behavior of BaseButton and ExtendedButton
    const BaseButton = ({ $isActive, className }) => {
      const baseClass = $isActive ? "bg-active" : "bg-inactive";
      return <button className={`${baseClass} ${className || ""}`.trim()} />;
    };

    const ExtendedButton = ({ $isActive, $isDisabled, className }) => {
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
    console.log(
      `cjs: ${NUM_COMPONENTS}x react extend: ${(end - start).toFixed(2)} ms`
    );
  });
});
