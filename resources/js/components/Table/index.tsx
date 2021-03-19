import React, { forwardRef, TableHTMLAttributes } from 'react'

type TableProps = {} & TableHTMLAttributes<HTMLTableElement>

const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ children, ...props }, ref) => {
    return (
      <div className="w-full overflow-x-auto">
        <table className="w-full whitespace-no-wrap" ref={ref} {...props}>
          {children}
        </table>
      </div>
    )
  }
)

export * from './TableContainer'
export * from './TableBody'
export * from './TableHeader'
export * from './TableFooter'
export * from './TableRow'
export * from './TableCell'
export * from './TableActions'

export default Table
