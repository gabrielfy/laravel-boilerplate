import React from 'react'

type SidebarDividerProps = {
  name: string
}

const SidebarDivider = ({ name }: SidebarDividerProps) => {
  return (
    <li className="my-px">
      <span className="flex font-medium text-sm text-gray-500 px-4 uppercase">
        {name}
      </span>
    </li>
  )
}

export default SidebarDivider
