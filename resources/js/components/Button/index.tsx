import React, {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  forwardRef
} from 'react'

import classNames from 'classnames'

type ButtonTypes =
  | ButtonHTMLAttributes<HTMLButtonElement>
  | AnchorHTMLAttributes<HTMLAnchorElement>

export type ButtonProps = {
  size?: 'small' | 'medium' | 'large'
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning'
  variant?: 'link' | 'outline'
  uppercase?: boolean
  disabled?: boolean
  block?: boolean
  as?: React.ElementType
  iconLeft?: JSX.Element
  iconRight?: JSX.Element
} & ButtonTypes

const buttonModifiers = {
  size: (size: string) => {
    if (size == 'small') {
      return 'px-3 py-1 rounded-md text-sm'
    }

    if (size == 'large') {
      return 'px-5 py-3 rounded-lg'
    }

    // default: medium
    return 'px-4 py-2 rounded-lg text-sm'
  },
  uppercase: () => 'uppercase',
  block: () => 'w-full',
  disabled: () => 'disabled:opacity-75 disabled:cursor-not-allowed',
  variant: (color: string, variant?: string) => {
    if (variant == 'link') {
      return classNames(
        `text-${color} focus:outline-none border border-transparent`,
        `active:bg-transparent hover:bg-gray-100 focus:shadow-outline-gray`
      )
    }

    if (variant == 'outline') {
      return classNames(
        `text-${color} border-${color}-light border focus:outline-none`,
        `active:bg-transparent hover:border-${color}-dark focus:border-${color}-dark active:text-${color}-dark focus:shadow-outline-${color}`
      )
    }

    return classNames(
      `bg-${color} focus:bg-${color}-dark text-white`,
      `hover:bg-${color}-dark active:bg-${color}-dark focus:shadow-outline-${color}`
    )
  }
}

// TODO: Add slot icon
const Button = forwardRef<React.ElementType, ButtonProps>(
  (
    {
      children,
      size = 'medium',
      color = 'secondary',
      variant,
      uppercase = false,
      block = false,
      as: Component = 'button',
      className,
      iconLeft = null,
      iconRight = null,
      ...props
    },
    ref
  ) => {
    const baseStyle =
      'align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none space-x-3'

    const styles = classNames(
      baseStyle,
      buttonModifiers.disabled(),
      !!uppercase && buttonModifiers.uppercase(),
      !!block && buttonModifiers.block(),
      !!size && buttonModifiers.size(size),
      buttonModifiers.variant(color, variant),
      className
    )

    return (
      <Component className={styles} {...props} ref={ref}>
        {!!iconLeft && iconLeft}
        {!!children && <span>{children}</span>}
        {!!iconRight && iconRight}
      </Component>
    )
  }
)

export default Button
