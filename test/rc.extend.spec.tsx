import '@testing-library/jest-dom'
import React, { type InputHTMLAttributes } from 'react'
import { render } from '@testing-library/react'

import rc from '../dist/index'

describe('rc.extends', () => {
  it('extends the base component with new props', () => {
    interface StyledSliderItemBaseProps {
      $isActive: boolean
    }

    const StyledSliderItemBase = rc.button<StyledSliderItemBaseProps>`
      absolute
      top-0
      ${(p) => (p.$isActive ? 'animate-in fade-in' : 'animate-out fade-out')}
    `

    interface NewStyledSliderItemProps extends StyledSliderItemBaseProps {
      $secondBool: boolean
    }

    const NewStyledSliderItemWithNewProps = rc.extend(StyledSliderItemBase)<NewStyledSliderItemProps>`
      rounded-lg
      text-lg
      ${(p) => (p.$isActive ? 'bg-blue' : 'bg-red')}
      ${(p) => (p.type === 'button' ? 'text-underline' : 'some-class-here')}
    `

    const { container } = render(
      <NewStyledSliderItemWithNewProps type="button" $isActive={false} $secondBool />
    )
    expect(container.firstChild).toHaveClass(
      'absolute top-0 animate-out fade-out rounded-lg text-lg bg-red text-underline'
    )
    expect(container.firstChild).not.toHaveAttribute('$isActive')
    expect(container.firstChild).not.toHaveAttribute('$secondBool')
    expect(container.firstChild).toBeInstanceOf(HTMLButtonElement)
  })

  it("assign a rc component and infer it's base types", () => {
    const StyledButton = rc.extend(rc.button``)<{ $trigger?: boolean }>`
      bg-white
      ${(p) => (p.type === 'button' ? 'border-primary' : '')}
    `

    const { container } = render(<StyledButton type="button" />)
    expect(container.firstChild).toHaveClass('bg-white border-primary')
  })

  it('extend a react component with an assigned class', () => {
    const MyInput = ({ ...props }: InputHTMLAttributes<HTMLInputElement>) => <input {...props} />

    const StyledDiv = rc.extend(MyInput)<{ $trigger?: boolean }>`
      bg-white
      ${(p) => (p.$trigger ? '!border-error' : '')}
    `

    const { container } = render(<StyledDiv $trigger />)
    expect(container.firstChild).toHaveClass('bg-white !border-error')
  })
})
