import React, { HTMLAttributes, forwardRef } from 'react'

import classNames from 'classnames'

type CardProps = {} & HTMLAttributes<HTMLDivElement>

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, ...props }: CardProps, ref) => {
    const style = classNames(
      'min-w-0 rounded-lg shadow-xs overflow-hidden bg-white',
      className
    )

    return (
      <div className={style} ref={ref} {...props}>
        {children}
      </div>
    )
  }
)

export * from './CardBody'

export default Card
