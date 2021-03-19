import React from 'react'
import Link, { LinkProps } from '@/components/Link'
import classNames from 'classnames'

type DropdownItemProps = {
  active?: boolean
} & LinkProps

const dropdownModifiers = {
  active: () => `text-primary`
}

export const DropdownItem = ({
  children,
  active = false,
  className,
  ...props
}: DropdownItemProps) => {
  const styles = classNames(
    'inline-flex items-center cursor-pointer w-full px-4 py-2 text-sm font-medium transition-colors duration-150 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-800',
    !!active && dropdownModifiers.active(),
    className
  )

  return (
    <Link className={styles} {...props}>
      {children}
    </Link>
  )
}
