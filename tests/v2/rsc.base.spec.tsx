import React from "react";
import { render } from "@testing-library/react";
import { rsc } from "../../src/index";

const RenderDiv = rsc.div`bg-red p-4`;

const HiddenDiv = rsc.div<{ $hidden: boolean }>`text-blue`;

describe("rsc base", () => {
  it("renders a rsc.div with assigned classes", () => {
    const { container } = render(<RenderDiv />);
    expect(container.firstChild).toHaveClass("bg-red p-4");
  });

  it("filters $-prefixed props & renders the class attribute on a rsc.div", () => {
    const { container } = render(<HiddenDiv $hidden />);
    expect(container.firstChild).not.toHaveAttribute("$hidden");
    expect(container.firstChild).toHaveClass("text-blue");
  });
});
