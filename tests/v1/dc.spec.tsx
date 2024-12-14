import React from "react";
import { render } from "@testing-library/react";
import { dc } from "../../src/v1/index";

describe("dc", () => {
  it("renders a dc.div with assigned classes", () => {
    const RenderDiv = dc.span(`bg-red p-4`);

    const { container } = render(<RenderDiv />);
    expect(container.firstChild).toHaveClass("bg-red p-4");
    expect(container.firstChild).toBeInstanceOf(HTMLSpanElement);
  });

  it("filters $-prefixed props & renders the class attribute on a dc.button", () => {
    const HiddenList = dc.ul<{ $hidden?: boolean }>(
      ({ $hidden }) => `
          text-lg
          mt-5
          py-2
          px-5
          ${$hidden ? "hidden" : ""}
      `
    );

    const { container } = render(<HiddenList $hidden />);
    expect(container.firstChild).not.toHaveAttribute("$hidden");
    expect(container.firstChild).toHaveClass("text-lg mt-5 py-2 px-5 hidden");
    expect(container.firstChild).toBeInstanceOf(HTMLUListElement);
  });
});
