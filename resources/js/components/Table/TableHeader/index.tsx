import React, { HTMLAttributes, forwardRef } from 'react'

import classNames from 'classnames'

type TableHeaderProps = {} & HTMLAttributes<HTMLTableSectionElement>

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(({ children, className, ...props }, ref) => {
  const styles = classNames(
    'text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b',
    className
  )
  return (
    <thead className={styles} ref={ref} {...props}>
      {children}
    </thead>
  )
})
