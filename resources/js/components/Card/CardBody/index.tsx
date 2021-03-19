import React, { HTMLAttributes, forwardRef } from 'react'

import classNames from 'classnames'

type CardBodyProps = {} & HTMLAttributes<HTMLDivElement>

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ children, className, ...props }: CardBodyProps, ref) => {
    const style = classNames('p-4', className)

    return (
      <div className={style} ref={ref} {...props}>
        {children}
      </div>
    )
  }
)
