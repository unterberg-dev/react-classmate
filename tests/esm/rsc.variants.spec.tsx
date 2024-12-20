import "@testing-library/jest-dom";
import React, { HTMLAttributes, InputHTMLAttributes } from "react";
import { render } from "@testing-library/react";
import rsc from "../../dist/index";

describe("rsc variants", () => {
  it("renders a rsc.div with assigned classes", () => {
    interface AlertProps extends HTMLAttributes<HTMLDivElement> {
      $severity: "info" | "warning" | "error";
      $isActive?: boolean;
    }

    const Alert = rsc.div.variants<AlertProps>({
      base: "p-4 rounded-md",
      variants: {
        $severity: {
          info: (p) => `bg-blue-100 text-blue-800 ${p.$isActive ? "shadow-lg" : ""}`,
          warning: (p) => `bg-yellow-100 text-yellow-800 ${p.$isActive ? "font-bold" : ""}`,
          error: (p) => `bg-red-100 text-red-800 ${p.$isActive ? "ring ring-red-500" : ""}`,
        },
      },
    });

    const { container } = render(
      <Alert $severity="info" $isActive>
        test
      </Alert>,
    );
    expect(container.firstChild).toHaveClass("p-4 rounded-md bg-blue-100 text-blue-800 shadow-lg");
    expect(container.firstChild).not.toHaveAttribute("severity");
    expect(container.firstChild).not.toHaveAttribute("$isActive");
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
  });
});

describe("extend rsc variants component", () => {
  it("renders a rsc.input with assigned classes", () => {
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

    const { container } = render(<ExtendedButton type="submit" $severity="info" $isActive $test />);
    expect(container.firstChild).toHaveClass(
      "p-4 bg-blue-100 text-blue-800 shadow-lg bg-green-100 text-green-800",
    );
    expect(container.firstChild).not.toHaveAttribute("$severity");
    expect(container.firstChild).not.toHaveAttribute("$isActive");
    expect(container.firstChild).not.toHaveAttribute("$test");
    expect(container.firstChild).toHaveAttribute("type");
    expect(container.firstChild).toBeInstanceOf(HTMLInputElement);
  });

  describe("extend rsc variants component with specific props", () => {
    it("renders a rsc.div with assigned classes", () => {
      interface ButtonProps extends InputHTMLAttributes<HTMLInputElement> {
        $size?: "small" | "default";
        $noGutter?: boolean;
        $border?: boolean;
      }

      const StyledButton = rsc.div.variants<ButtonProps>({
        base: (p) => `
          ${p.$noGutter ? "!p-0" : ""}
          px-3
          py-2
          flex
          items-center
          justify-center
          gap-1
        `,
        variants: {
          $size: {
            small: (p) => `${p.$border ? "border" : ""} px-2 py-1 text-small`,
            default: "px-3 py-2",
          },
        },
      });

      const ExtendedButton = rsc.extend(StyledButton)<ButtonProps>`
        ${(p) => (p.$size === "small" ? "text-small" : "")}
      `;

      const { container } = render(
        <ExtendedButton type="submit" $size="small" $noGutter $border>
          Hey
        </ExtendedButton>,
      );
      expect(container.firstChild).toHaveClass(
        "px-3 py-2 flex items-center justify-center gap-1 text-small border",
      );
      expect(container.firstChild).not.toHaveAttribute("$size");
      expect(container.firstChild).not.toHaveAttribute("$noGutter");
      expect(container.firstChild).not.toHaveAttribute("$border");
      expect(container.firstChild).toHaveAttribute("type");
      expect(container.firstChild).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("use variants component with defaultValues", () => {
    const SomeButtonRscVariants = rsc.button.variants({
      base: `
          mt-5
          border-1
          transition-all
        `,
      variants: {
        state: {
          default: "bg-blue-800 text-blue-200",
          loading: "bg-blue-400 text-white opacity-90 pointer-events-none",
        },
        size: {
          sm: "text-sm py-1 px-2",
          md: "text-base py-2 px-4",
          lg: "text-lg py-3 px-6",
        },
      },
      defaultVariants: {
        state: "default",
        size: "md",
      },
    });

    it("renders a button with default values", () => {
      const { container } = render(<SomeButtonRscVariants state="default">test</SomeButtonRscVariants>);
      expect(container.firstChild).toHaveClass(
        "mt-5 border-1 transition-all bg-blue-800 text-blue-200 text-base py-2 px-4",
      );
      expect(container.firstChild).not.toHaveAttribute("state");
      expect(container.firstChild).not.toHaveAttribute("size");
      expect(container.firstChild).toBeInstanceOf(HTMLButtonElement);
    });
  });
});
