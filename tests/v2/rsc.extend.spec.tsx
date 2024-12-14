import React, { HTMLAttributes } from "react";
import { render } from "@testing-library/react";
import { rsc } from "../../src/index";

describe("rsc.extends", () => {
  it("extends the base component with new props", () => {
    interface StyledSliderItemBaseProps {
      $isActive: boolean;
    }

    const StyledSliderItemBase = rsc.button<StyledSliderItemBaseProps>`
      absolute
      h-full
      w-full
      left-0
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
      "absolute h-full w-full left-0 top-0 animate-out fade-out rounded-lg text-lg bg-red text-underline"
    );
    expect(container.firstChild).not.toHaveAttribute("$isActive");
    expect(container.firstChild).toBeInstanceOf(HTMLButtonElement);
  });

  it("extends the base component with button attributes", () => {
    const ExtendedButton = rsc.extend(rsc.button``, "button")<{
      $isActive?: boolean;
    }>`
      some-class
      ${(p) => {
        if (p.type === "submit") {
          return "font-bold";
        }
        if (p.type === "reset") {
          return "font-italic";
        }
        return "font-normal";
      }}
    `;

    const { container } = render(<ExtendedButton type="submit" $isActive />);
    const button = container.firstChild;

    // Check className for $isActive styling
    expect(button).toHaveClass("some-class font-bold");

    // Check DOM attributes
    expect(button).toHaveAttribute("type", "submit"); // Valid intrinsic prop
    expect(button).not.toHaveAttribute("$isActive"); // $-prefixed props are not in DOM
    expect(container.firstChild).toBeInstanceOf(HTMLButtonElement);
  });

  it("extend a react component with an assigned class", () => {
    const DivComponent = ({ ...props }: HTMLAttributes<HTMLDivElement>) => (
      <div {...props} />
    );

    const StyledDiv = rsc.extend(DivComponent)<{ $trigger?: boolean }>`
      bg-white
      ${(p) => (p.$trigger ? "!border-error" : "")}
    `;

    const { container } = render(<StyledDiv $trigger />);

    // Check className for $trigger styling
    expect(container.firstChild).toHaveClass("bg-white !border-error");
  });
});
