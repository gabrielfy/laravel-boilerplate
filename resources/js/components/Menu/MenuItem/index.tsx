import React, { ButtonHTMLAttributes } from 'react'
import { InertiaLink, InertiaLinkProps } from '@inertiajs/inertia-react'

import classNames from 'classnames'

type MenuItemProps = {
  active?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const linkModifiers = {
  active: () => 'text-primary'
}

export const MenuItem = ({
  children,
  active = false,
  className,
  ...props
}: MenuItemProps) => {
  const styles = classNames(
    'px-4 py-2 w-full text-left text-sm font-normal rounded text-gray-600 hover:bg-gray-100 hover:text-primary cursor-pointer focus:outline-none',
    !!active && linkModifiers.active(),
    className
  )

  return (
    <li>
      <button type="button" role="menuitem" className={styles} {...props}>
        {children}
      </button>
    </li>
  )
}
