import "@testing-library/jest-dom";
import React, { HTMLAttributes } from "react";
import { render } from "@testing-library/react";
import rsc from "../../src/index";

describe("rsc.extends", () => {
  it("extends the base component with new props", () => {
    interface StyledSliderItemBaseProps {
      $isActive: boolean;
    }

    const StyledSliderItemBase = rsc.button<StyledSliderItemBaseProps>`
      absolute
      top-0
      ${(p) => (p.$isActive ? "animate-in fade-in" : "animate-out fade-out")}
    `;

    interface NewStyledSliderItemProps extends StyledSliderItemBaseProps {
      $secondBool: boolean;
    }

    const NewStyledSliderItemWithNewProps = rsc.extend(
      StyledSliderItemBase
    )<NewStyledSliderItemProps>`
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

  it("assign a rsc component and infer it's base types", () => {
    const StyledButton = rsc.extend(rsc.button``)<{ $trigger?: boolean }>`
      bg-white
      ${(p) => (p.type === "button" ? "border-primary" : "")}
    `;

    const { container } = render(<StyledButton type="button" />);
    expect(container.firstChild).toHaveClass("bg-white border-primary");
  });

  it("extend a react component with an assigned class", () => {
    const MyInput = ({ ...props }: HTMLAttributes<HTMLInputElement>) => (
      <input {...props} />
    );

    const StyledDiv = rsc.extend(MyInput)<{ $trigger?: boolean }>`
      bg-white
      ${(p) => (p.$trigger ? "!border-error" : "")}
    `;

    const { container } = render(<StyledDiv $trigger />);
    expect(container.firstChild).toHaveClass("bg-white !border-error");
  });
});
