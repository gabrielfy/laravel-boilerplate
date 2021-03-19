import React from 'react'

type MenuLabelProps = {
  name: string
}

export const MenuLabel = ({ name }: MenuLabelProps) => {
  return (
    <li className="flex items-center">
      <span className="flex font-medium text-sm text-gray-600 px-4 py-2 uppercase">
        {name}
      </span>
    </li>
  )
}
