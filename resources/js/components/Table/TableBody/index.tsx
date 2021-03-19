import React, { HTMLAttributes, forwardRef } from 'react'

import classNames from 'classnames'

type TableBodyProps = {} & HTMLAttributes<HTMLTableSectionElement>

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ children, className, ...props }, ref) => {
    const styles = classNames('bg-white divide-y text-gray-700', className)
    return (
      <tbody className={styles} ref={ref} {...props}>
        {children}
      </tbody>
    )
  }
)
