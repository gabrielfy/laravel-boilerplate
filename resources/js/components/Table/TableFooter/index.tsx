import React, { HTMLAttributes, forwardRef } from 'react'

import classNames from 'classnames'

type TableFooterProps = {} & HTMLAttributes<HTMLTableSectionElement>

export const TableFooter = forwardRef<
  HTMLTableSectionElement,
  TableFooterProps
>(({ children, className, ...props }, ref) => {
  const styles = classNames('px-4 py-3 border-t text-gray-500', className)
  return (
    <div className={styles} ref={ref} {...props}>
      {children}
    </div>
  )
})
