import React from 'react'
import { InertiaLink, InertiaLinkProps } from '@inertiajs/inertia-react'
import classNames from 'classnames'

export type LinkProps = {
  children: React.ReactNode
  fontSize?: 'small' | 'medium' | 'large'
  color?: 'primary' | 'secondary' | 'gray'
  uppercase?: boolean
} & InertiaLinkProps

const linkModifiers = {
  size: (size: string) => `text-${size}`,
  uppercase: () => 'uppercase',
  color: (color: string) => `text-${color}`
}

const Link = ({
  children,
  color = 'gray',
  uppercase = false,
  fontSize = 'medium',
  className,
  ...props
}: LinkProps) => {
  const styles = classNames(
    'focus:outline-none',
    !!color && linkModifiers.color(color),
    !!fontSize && linkModifiers.size(fontSize),
    !!uppercase && linkModifiers.uppercase(),
    className
  )

  return (
    <InertiaLink className={styles} {...props}>
      {children}
    </InertiaLink>
  )
}

export default Link
