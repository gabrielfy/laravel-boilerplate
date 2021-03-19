import React, { HTMLAttributes, forwardRef } from 'react'

import classNames from 'classnames'

type TableRowProps = {} & HTMLAttributes<HTMLTableRowElement>

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ children, className, ...props }, ref) => {
    const styles = classNames('', className)
    return (
      <tr className={styles} ref={ref} {...props}>
        {children}
      </tr>
    )
  }
)
