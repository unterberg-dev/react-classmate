import '@testing-library/jest-dom'
import React from 'react'
import { render } from '@testing-library/react'

import rc from '../dist/index'

describe('rc variants', () => {
  it('renders a rc.div with assigned classes', () => {
    interface AlertProps {
      $severity: 'info' | 'warning' | 'error'
      $isActive?: boolean
    }

    const Alert = rc.div.variants<AlertProps>({
      base: 'p-4 rounded-md',
      variants: {
        $severity: {
          info: (p) => `bg-blue-100 text-blue-800 ${p.$isActive ? 'shadow-lg' : ''}`,
          warning: (p) => `bg-yellow-100 text-yellow-800 ${p.$isActive ? 'font-bold' : ''}`,
          error: (p) => `bg-red-100 text-red-800 ${p.$isActive ? 'ring ring-red-500' : ''}`
        }
      }
    })

    const { container } = render(
      <Alert $severity="info" $isActive>
        test
      </Alert>
    )
    expect(container.firstChild).toHaveClass('p-4 rounded-md bg-blue-100 text-blue-800 shadow-lg')
    expect(container.firstChild).not.toHaveAttribute('severity')
    expect(container.firstChild).not.toHaveAttribute('$isActive')
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement)
  })
})

describe('extend rc variants component', () => {
  it('renders a rc.input with assigned classes', () => {
    interface ButtonProps {
      $severity: 'info' | 'warning' | 'error'
      $isActive?: boolean
    }

    const Alert = rc.input.variants<ButtonProps>({
      base: 'p-4',
      variants: {
        $severity: {
          info: (p) => `bg-blue-100 text-blue-800 ${p.$isActive ? 'shadow-lg' : ''}`
        }
      }
    })

    const ExtendedButton = rc.extend(Alert)<{ $test: boolean }>`
        ${(p) => (p.$test ? 'bg-green-100 text-green-800' : '')}
      `

    const { container } = render(<ExtendedButton type="submit" $severity="info" $isActive $test />)
    expect(container.firstChild).toHaveClass(
      'p-4 bg-blue-100 text-blue-800 shadow-lg bg-green-100 text-green-800'
    )
    expect(container.firstChild).not.toHaveAttribute('$severity')
    expect(container.firstChild).not.toHaveAttribute('$isActive')
    expect(container.firstChild).not.toHaveAttribute('$test')
    expect(container.firstChild).toHaveAttribute('type')
    expect(container.firstChild).toBeInstanceOf(HTMLInputElement)
  })

  describe('extend rc variants component with specific props', () => {
    it('renders a rc.div with assigned classes', () => {
      interface ButtonProps {
        $size?: 'small' | 'default'
        $noGutter?: boolean
        $border?: boolean
      }

      const StyledButton = rc.button.variants<ButtonProps>({
        base: (p) => `
          ${p.$noGutter ? '!p-0' : ''}
          px-3
          py-2
          flex
          items-center
          justify-center
          gap-1
        `,
        variants: {
          $size: {
            small: (p) => `${p.$border ? 'border' : ''} px-2 py-1 text-small`,
            default: 'px-3 py-2'
          }
        }
      })

      const ExtendedButton = rc.extend(StyledButton)<ButtonProps>`
        ${(p) => (p.$size === 'small' ? 'text-small' : '')}
      `

      const { container } = render(
        <ExtendedButton type="submit" $size="small" $noGutter $border>
          Hey
        </ExtendedButton>
      )
      expect(container.firstChild).toHaveClass(
        'px-3 py-2 flex items-center justify-center gap-1 text-small border'
      )
      expect(container.firstChild).not.toHaveAttribute('$size')
      expect(container.firstChild).not.toHaveAttribute('$noGutter')
      expect(container.firstChild).not.toHaveAttribute('$border')
      expect(container.firstChild).toHaveAttribute('type')
      expect(container.firstChild).toBeInstanceOf(HTMLButtonElement)
    })
  })

  describe('use variants component with defaultValues', () => {
    const SomeButtonRcVariants = rc.button.variants<{ $test?: boolean }, { state?: 'default'; size?: '' }>({
      base: `
          mt-5
          border-1
          transition-all
        `,
      variants: {
        state: {
          default: 'bg-blue-800 text-blue-200',
          loading: 'bg-blue-400 text-white opacity-90 pointer-events-none'
        },
        size: {
          sm: 'text-sm py-1 px-2',
          md: 'text-base py-2 px-4',
          lg: 'text-lg py-3 px-6'
        }
      },
      defaultVariants: {
        state: 'default',
        size: 'md'
      }
    })

    it('renders a button with default values', () => {
      const { container } = render(<SomeButtonRcVariants state="default">test</SomeButtonRcVariants>)
      expect(container.firstChild).toHaveClass(
        'mt-5 border-1 transition-all bg-blue-800 text-blue-200 text-base py-2 px-4'
      )
      expect(container.firstChild).not.toHaveAttribute('state')
      expect(container.firstChild).not.toHaveAttribute('size')
      expect(container.firstChild).toBeInstanceOf(HTMLButtonElement)
    })
  })
})
