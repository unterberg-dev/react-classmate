import React from "react";
import { render } from "@testing-library/react";
import { dc, restyle } from "../../src/v1/index";

describe("restyle", () => {
  it("renders a dc.div with assigned classes and restyles it by adding more classes", () => {
    const RenderDiv = dc.span(`bg-red p-4`);
    const RestyleDiv = restyle(
      RenderDiv,
      `
        md:-right-4.5
        right-1
        slide-in-r-20
      `
    );

    const { container } = render(<RestyleDiv />);
    expect(container.firstChild).toHaveClass(
      "bg-red p-4 md:-right-4.5 right-1 slide-in-r-20"
    );
    expect(container.firstChild).toBeInstanceOf(HTMLSpanElement);
  });

  it("extends the base component with new props", () => {
    interface StyledSliderItemBaseProps {
      $isActive: boolean;
    }

    const StyledSliderItemBase = dc.button<StyledSliderItemBaseProps>(
      ({ $isActive }) => `
            absolute
            h-full
            w-full
            left-0
            top-0
            ${$isActive ? "animate-in fade-in" : "animate-out fade-out"}
        `
    );

    interface NewStyledSliderItemProps extends StyledSliderItemBaseProps {
      $secondBool: boolean;
    }

    const NewStyledSliderItemWithNewProps = restyle<NewStyledSliderItemProps>(
      StyledSliderItemBase,
      ({ $isActive, $secondBool }) => `
            rounded-lg
            text-lg
            ${$isActive ? "bg-blue" : "bg-red"}
            ${$secondBool ? "text-underline" : ""}
        `
    );

    const { container } = render(
      <NewStyledSliderItemWithNewProps $isActive={false} $secondBool />
    );
    expect(container.firstChild).toHaveClass(
      "absolute h-full w-full left-0 top-0 animate-out fade-out rounded-lg text-lg bg-red text-underline"
    );
    expect(container.firstChild).not.toHaveAttribute("$isActive");
    expect(container.firstChild).toBeInstanceOf(HTMLButtonElement);
  });
});
