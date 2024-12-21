const React = require("react");
const rc = require("../../dist/index.cjs.js");
const { render } = require("@testing-library/react");

describe("CommonJS Build", () => {
  it("should import the library using require", () => {
    const RenderDiv = rc.div`bg-red p-4`;

    const { container } = render(<RenderDiv />);
    expect(container.firstChild).toHaveClass("bg-red p-4");
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
  });
});

describe("rc base", () => {
  it("renders a rc.div with assigned classes", () => {
    const RenderDiv = rc.div`bg-red p-4`;

    const { container } = render(<RenderDiv />);
    expect(container.firstChild).toHaveClass("bg-red p-4");
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
  });

  it("filters $-prefixed props & renders the class attribute on a rc.button", () => {
    const HiddenButton = rc.button`text-blue custom`;

    const { container } = render(<HiddenButton $hidden />);
    expect(container.firstChild).not.toHaveAttribute("$hidden");
    expect(container.firstChild).toHaveClass("text-blue custom");
    expect(container.firstChild).toBeInstanceOf(HTMLButtonElement);
  });
});

describe("rc.extends", () => {
  it("extends the base component with new props", () => {
    const StyledSliderItemBase = rc.button`
      absolute
      top-0
      ${(p) => (p.$isActive ? "animate-in fade-in" : "animate-out fade-out")}
    `;

    const NewStyledSliderItemWithNewProps = rc.extend(StyledSliderItemBase)`
      rounded-lg
      text-lg
      ${(p) => (p.$isActive ? "bg-blue" : "bg-red")}
      ${(p) => (p.$secondBool ? "text-underline" : "some-class-here")}
    `;

    const { container } = render(
      <NewStyledSliderItemWithNewProps $isActive={false} $secondBool />
    );
    expect(container.firstChild).toHaveClass(
      "absolute top-0 animate-out fade-out rounded-lg text-lg bg-red text-underline"
    );
    expect(container.firstChild).not.toHaveAttribute("$isActive");
    expect(container.firstChild).toBeInstanceOf(HTMLButtonElement);
  });

  it("assign a rc component and infer it's base types", () => {
    const StyledButton = rc.extend(rc.button``)`
      bg-white
      ${(p) => (p.type === "button" ? "border-primary" : "")}
    `;

    const { container } = render(<StyledButton type="button" />);
    expect(container.firstChild).toHaveClass("bg-white border-primary");
  });

  it("extend a react component with an assigned class", () => {
    const MyInput = ({ ...props }) => <input {...props} />;

    const StyledDiv = rc.extend(MyInput)`
      bg-white
      ${(p) => (p.$trigger ? "!border-error" : "")}
    `;

    const { container } = render(<StyledDiv $trigger />);
    expect(container.firstChild).toHaveClass("bg-white !border-error");
  });
});
