import React from 'react'
import { IconType } from 'react-icons'
import { InertiaLink, InertiaLinkProps } from '@inertiajs/inertia-react'

import className from 'classnames'

type SidebarItemProps = {
  children: React.ReactNode
  icon: IconType
  active?: boolean
} & InertiaLinkProps

const sidebarItemModifiers = {
  active: () => 'bg-primary text-gray-50'
}

// TODO: Make right slot for badge
const SidebarItem = ({
  children,
  icon: Icon,
  active = false,
  ...props
}: SidebarItemProps) => {
  const styles = className(
    'flex flex-row items-center h-12 px-4 rounded-lg hover:bg-primary hover:text-gray-50 focus:outline-none',
    active ? sidebarItemModifiers.active() : 'text-gray-300'
  )

  return (
    <li className="my-px">
      <InertiaLink className={styles} {...props}>
        <span className="flex items-center justify-center text-lg">
          <Icon className="w-6 h-6" />
        </span>
        <span className="ml-3 tracking-wide truncate">{children}</span>
        {/* <span className="flex items-center justify-center text-sm text-gray-500 font-semibold bg-gray-200 h-6 px-2 rounded-full ml-auto">
          3
        </span> */}
      </InertiaLink>
    </li>
  )
}

export default SidebarItem
