import React from 'react'

type DropdownListProps = {
  children: React.ReactNode
}

export const DropdownList = ({ children }: DropdownListProps) => {
  return (
    <ul className="" role="menu">
      {children}
    </ul>
  )
}
