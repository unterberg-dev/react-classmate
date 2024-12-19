import "@testing-library/jest-dom";
import React from "react";
import { render } from "@testing-library/react";
import rsc from "../../dist/index";

describe("rsc base", () => {
  it("renders a rsc.div with assigned classes", () => {
    const RenderDiv = rsc.div`bg-red p-4`;

    const { container } = render(<RenderDiv />);
    expect(container.firstChild).toHaveClass("bg-red p-4");
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
  });

  it("filters $-prefixed props & renders the class attribute on a rsc.button", () => {
    const HiddenButton = rsc.button<{ $hidden: boolean }>`text-blue custom`;

    const { container } = render(<HiddenButton aria-label="testlabel" $hidden />);
    expect(container.firstChild).not.toHaveAttribute("$hidden");
    expect(container.firstChild).toHaveClass("text-blue custom");
    expect(container.firstChild).toHaveAttribute("aria-label")
    expect(container.firstChild).toBeInstanceOf(HTMLButtonElement);
  });
});
