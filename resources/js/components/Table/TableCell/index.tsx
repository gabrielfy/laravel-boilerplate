import React, { HTMLAttributes, forwardRef } from 'react'

import classNames from 'classnames'

type TableCellProps = {} & HTMLAttributes<HTMLTableCellElement>

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ children, className, ...props }, ref) => {
    const styles = classNames('px-4 py-3', className)
    return (
      <td className={styles} ref={ref} {...props}>
        {children}
      </td>
    )
  }
)
