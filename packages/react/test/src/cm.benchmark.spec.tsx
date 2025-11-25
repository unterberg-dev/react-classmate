/**
  benchmark for cm - not implement -> if you want to implement, please add "spec" to the file name (see sibling files)
*/
import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import type { InputHTMLAttributes, ReactNode } from "react"
import React from "react"

import cm from "../../dist"

const NUM_COMPONENTS = 50

// unique map
const numMap = Array.from({ length: NUM_COMPONENTS }, (_, i) => i)

describe("cm stress benchmark", () => {
  it("cm benchmark warmup", () => {
    const start = performance.now()

    const CmDiv = cm.div`bg-red p-4`
    const ReactDiv = (props: { className?: string }) => <div className={props.className} />

    const components = numMap.map((i) =>
      i % 2 === 0 ? <CmDiv key={i} /> : <ReactDiv key={i} className="bg-red p-4" />,
    )

    const { container } = render(components)
    const end = performance.now()

    expect(container.firstChild).toBeTruthy()
    console.log(`000) ${NUM_COMPONENTS}x rsx and react elements - warmup: ${(end - start).toFixed(2)} ms`)
  })

  it("cm creation", () => {
    const start = performance.now()

    const CmDiv = cm.div`bg-red p-4`
    const components = numMap.map((i) => <CmDiv key={i} />)

    const { container } = render(components)
    const end = performance.now()

    expect(container.firstChild).toBeTruthy()
    console.log(`A) ${NUM_COMPONENTS}x cm base: ${(end - start).toFixed(2)} ms`)
  })

  it("react creation", () => {
    const start = performance.now()

    const ReactDiv = (props: { className?: string }) => <div className={props.className} />
    const components = numMap.map((i) => <ReactDiv key={i} className="bg-red p-4" />)

    const { container } = render(components)
    const end = performance.now()

    expect(container.firstChild).toBeTruthy()
    console.log(`A) ${NUM_COMPONENTS}x react base: ${(end - start).toFixed(2)} ms`)
  })

  it("cm.extend", () => {
    const start = performance.now()

    interface BaseProps {
      $isActive: boolean
    }

    const BaseButton = cm.button<BaseProps>`
      ${(p) => (p.$isActive ? "bg-active" : "bg-inactive")}
    `

    const ExtendedButton = cm.extend(BaseButton)<{ $isDisabled?: boolean }>`
      ${(p) => (p.$isDisabled ? "opacity-50" : "opacity-100")}
      ${(p) => (p.$isActive ? "text-bold" : "text-normal")}
    `

    const components = numMap.map((i) => (
      <ExtendedButton key={i} $isActive={i % 2 === 0} $isDisabled={i % 3 === 0} />
    ))

    const { container } = render(components)
    const end = performance.now()

    expect(container.firstChild).toBeTruthy()
    console.log(`B) ${NUM_COMPONENTS}x cm base + cm.extend: ${(end - start).toFixed(2)} ms`)
  })

  it("react prop nesting", () => {
    const start = performance.now()

    // Mimic the behavior of BaseButton and ExtendedButton
    const BaseButton = ({ isActive, className }: { isActive: boolean; className?: string }) => {
      const baseClass = isActive ? "bg-active" : "bg-inactive"
      return <button type="button" className={`${baseClass} ${className || ""}`.trim()} />
    }

    const ExtendedButton = ({
      $isActive,
      $isDisabled,
      className,
    }: {
      $isActive: boolean
      $isDisabled?: boolean
      className?: string
    }) => {
      const baseClass = $isActive ? "bg-active" : "bg-inactive"
      const extendedClass = [
        baseClass,
        $isDisabled ? "opacity-50" : "opacity-100",
        $isActive ? "text-bold" : "text-normal",
        className || "",
      ]
        .filter(Boolean)
        .join(" ")
        .trim()
      return <BaseButton isActive className={extendedClass} />
    }

    const components = numMap.map((i) => (
      <ExtendedButton key={i} $isActive={i % 2 === 0} $isDisabled={i % 3 === 0} />
    ))

    const { container } = render(components)
    const end = performance.now()

    expect(container.firstChild).toBeTruthy()
    console.log(`B) ${NUM_COMPONENTS}x react extend: ${(end - start).toFixed(2)} ms`)
  })

  it("cm extend variants", () => {
    const start = performance.now()

    interface ButtonProps extends InputHTMLAttributes<HTMLInputElement> {
      $severity: "info" | "warning" | "error"
      $isActive?: boolean
    }

    const Alert = cm.input.variants<ButtonProps>({
      base: "p-4",
      variants: {
        $severity: {
          info: (p) => `bg-blue-100 text-blue-800 ${p.$isActive ? "shadow-lg" : ""}`,
        },
      },
    })

    const ExtendedButton = cm.extend(Alert)<{ $test: boolean }>`
      ${(p) => (p.$test ? "bg-green-100 text-green-800" : "")}
    `

    const components = numMap.map((i) => (
      <ExtendedButton key={i} type="submit" $severity="info" $isActive $test />
    ))

    const { container } = render(components)
    const end = performance.now()

    expect(container.firstChild).toBeTruthy()
    console.log(`C) ${NUM_COMPONENTS}x cm variants: ${(end - start).toFixed(2)} ms`)
  })

  it("react extend variants", () => {
    const start = performance.now()

    interface ButtonProps {
      severity: "info" | "warning" | "error"
      isActive?: boolean
      className?: string
      children?: ReactNode
      type?: "button" | "submit" | "reset"
    }

    // Base component mimicking cm.input.variants
    const Alert = ({ severity, isActive, className, ...props }: ButtonProps) => {
      const baseClass = "p-4"
      const severityClass =
        severity === "info" ? `bg-blue-100 text-blue-800 ${isActive ? "shadow-lg" : ""}` : ""

      const finalClass = [baseClass, severityClass, className].filter(Boolean).join(" ").trim()

      return <input className={finalClass} {...props} />
    }

    // Extended component mimicking cm.extend
    const ExtendedButton = ({
      severity,
      isActive,
      test,
      className,
      ...props
    }: ButtonProps & { test?: boolean }) => {
      const extendedClass = test ? "bg-green-100 text-green-800" : ""

      const finalClass = [className, extendedClass].filter(Boolean).join(" ").trim()

      return <Alert severity={severity} isActive={isActive} className={finalClass} {...props} />
    }

    // Render components
    const components = numMap.map((i) => (
      <ExtendedButton key={i} type="submit" severity="info" isActive={i % 2 === 0} test={i % 3 === 0} />
    ))

    const { container } = render(components)
    const end = performance.now()

    expect(container.firstChild).toBeTruthy()
    console.log(`C) ${NUM_COMPONENTS}x react variants: ${(end - start).toFixed(2)} ms`)
  })

  it("cm.variants with styles", () => {
    const start = performance.now()

    interface ButtonProps extends InputHTMLAttributes<HTMLButtonElement> {
      $severity: "info" | "warning" | "error"
      $isActive?: boolean
    }

    const AlertButton = cm.button.variants<ButtonProps>({
      base: "p-4 border rounded",
      variants: {
        $severity: {
          info: (p) => `bg-blue-100 text-blue-800 ${p.$isActive ? "font-bold" : ""}`,
          warning: (p) => `bg-yellow-100 text-yellow-800 ${p.$isActive ? "font-bold" : ""}`,
          error: (p) => `bg-red-100 text-red-800 ${p.$isActive ? "font-bold" : ""}`,
        },
      },
    })

    const components = numMap.map((i) => (
      <AlertButton
        key={i}
        type="button"
        $severity={i % 3 === 0 ? "info" : i % 3 === 1 ? "warning" : "error"}
        $isActive={i % 2 === 0}
      >
        Alert {i}
      </AlertButton>
    ))

    const { container } = render(components)
    const end = performance.now()

    expect(container.firstChild).toBeTruthy()
    console.log(`D) ${NUM_COMPONENTS}x cm.variants with styles: ${(end - start).toFixed(2)} ms`)
  })

  it("react equivalent with prop-based styles", () => {
    const start = performance.now()

    const AlertButton = ({
      severity,
      isActive,
      className,
      children,
    }: {
      severity: "info" | "warning" | "error"
      isActive?: boolean
      className?: string
      children?: ReactNode
    }) => {
      const baseClass = "p-4 border rounded"
      const severityClass =
        severity === "info"
          ? `bg-blue-100 text-blue-800 ${isActive ? "font-bold" : ""}`
          : severity === "warning"
            ? `bg-yellow-100 text-yellow-800 ${isActive ? "font-bold" : ""}`
            : `bg-red-100 text-red-800 ${isActive ? "font-bold" : ""}`

      const finalClass = [baseClass, severityClass, className].filter(Boolean).join(" ").trim()
      return (
        <button type="button" className={finalClass}>
          {children}
        </button>
      )
    }

    const components = numMap.map((i) => (
      <AlertButton
        key={i}
        severity={i % 3 === 0 ? "info" : i % 3 === 1 ? "warning" : "error"}
        isActive={i % 2 === 0}
      >
        Alert {i}
      </AlertButton>
    ))

    const { container } = render(components)
    const end = performance.now()

    expect(container.firstChild).toBeTruthy()
    console.log(`D) ${NUM_COMPONENTS}x react equivalent with styles: ${(end - start).toFixed(2)} ms`)
  })
})
