import React, { forwardRef } from 'react'
import classNames from 'classnames'

type SelectProps = {
  children: React.ReactNode
  label?: string
  inline?: boolean
} & React.SelectHTMLAttributes<HTMLSelectElement>

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, name, label, inline, ...props }: SelectProps, ref) => {
    const styles = classNames(
      'focus:ring-primary focus:border-primary focus:outline-none block w-full pr-3 py-2 text-gray-700 border-gray-300 rounded-lg'
    )

    return (
      <div className={classNames(!!inline && 'md:flex md:items-center')}>
        <div className={classNames(!!inline && 'md:mb-0 md:w-1/3')}>
          {!!label && (
            <label
              className={classNames(
                'block px-1 text-gray-500',
                !!inline ? 'text-base' : 'text-sm font-semibold '
              )}
              htmlFor={name}
            >
              {label}
            </label>
          )}
        </div>
        <div
          className={classNames(
            'mt-1 relative rounded-md shadow-sm',
            !!inline && 'md:w-2/3 md:flex-grow'
          )}
        >
          <select name={name} id={name} className={styles} {...props} ref={ref}>
            {children}
          </select>
        </div>
      </div>
    )
  }
)

export * from './SelectOption'

export default Select
