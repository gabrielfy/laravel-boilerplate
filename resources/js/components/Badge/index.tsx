import React from 'react'
import classNames from 'classnames'

type BadgeProps = {
  children: React.ReactNode
  type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'
}

const badgeModifiers = {
  type: (type: string) => `text-${type}-dark bg-${type}-light`
}

const Badge = ({ children, type = 'primary' }: BadgeProps) => {
  const style = classNames(
    'inline-block rounded-full text-white duration-300 text-xs font-bold mr-1 md:mr-2 mb-2 px-2 md:px-4 py-1 opacity-90 hover:opacity-100',
    badgeModifiers.type(type)
  )

  return <span className={style}>{children}</span>
}

export default Badge
