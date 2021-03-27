import React from 'react'
import Link, { LinkProps } from '@/components/Link'
import classNames from 'classnames'

// TODO: Refactor
type DropdownItemLinkProps = {
  active?: boolean
} & LinkProps

type DropdownItemButton = {
  active?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const dropdownModifiers = {
  active: () => `text-primary`
}

export const DropdownItemLink = ({
  children,
  active = false,
  className,
  ...props
}: DropdownItemLinkProps) => {
  const styles = classNames(
    'inline-flex items-center cursor-pointer w-full px-4 py-2 text-sm font-medium transition-colors duration-150 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-800 focus:outline-none',
    !!active && dropdownModifiers.active(),
    className
  )

  return (
    <Link className={styles} {...props}>
      {children}
    </Link>
  )
}

export const DropdownItemButton = ({
  children,
  active = false,
  className,
  ...props
}: DropdownItemButton) => {
  const styles = classNames(
    'inline-flex items-center cursor-pointer w-full px-4 py-2 text-sm font-medium transition-colors duration-150 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-800 focus:outline-none',
    !!active && dropdownModifiers.active(),
    className
  )

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  )
}
