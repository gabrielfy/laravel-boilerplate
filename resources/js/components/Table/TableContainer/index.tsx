import React, { HTMLAttributes, forwardRef } from 'react'

import classNames from 'classnames'

type TableContainerProps = {} & HTMLAttributes<HTMLDivElement>

export const TableContainer = forwardRef<HTMLDivElement, TableContainerProps>(
  ({ children, className, ...props }, ref) => {
    const styles = classNames(
      'w-full overflow-hidden rounded-lg shadow-xs',
      className
    )
    return (
      <div className={styles} ref={ref} {...props}>
        {children}
      </div>
    )
  }
)
