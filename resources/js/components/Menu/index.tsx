import React from 'react'

type MenuProps = {
  children: React.ReactNode
}

// TODO: refactory component

const Menu = ({ children }: MenuProps) => {
  return (
    <div className="rounded-md bg-white" role="menu">
      <ul>{children}</ul>
    </div>
  )
}

export * from './MenuItem'

export * from './MenuLabel'

export default Menu
