import React, { InputHTMLAttributes, forwardRef } from 'react'
import classNames from 'classnames'

export type InputProps = {
  name: string
  label?: string
  icon?: JSX.Element
  helperText?: string
  inline?: boolean
  error?: string
} & InputHTMLAttributes<HTMLInputElement>

const inputModifiers = {
  error: () => 'border-red-500',
  icon: () => 'pl-9'
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      label,
      icon = null,
      helperText = '',
      error = '',
      inline = false,
      ...props
    },
    ref
  ) => {
    const styles = classNames(
      'focus:ring-primary focus:border-primary focus:outline-none block w-full pr-3 py-2 text-gray-700 border-gray-300 rounded-lg',
      !!icon ? inputModifiers.icon() : 'pl-3',
      !!error && inputModifiers.error()
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
          {!!icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400 text-lg">{icon}</span>
            </div>
          )}
          <input
            className={styles}
            id={name}
            name={name}
            ref={ref}
            {...props}
          />
        </div>
        {!!helperText && (
          <p className="flex items-center font-medium tracking-wide text-xs mt-1 px-1 text-gray-500 ">
            {helperText}
          </p>
        )}
        {!!error && (
          <p className="flex items-center font-medium tracking-wide text-xs mt-1 px-1 text-red-500">
            {error}
          </p>
        )}
      </div>
    )
  }
)

{
  /* <div className="col-span-3">
              <div className="text-gray-700 md:flex md:items-center">
                <div className="mb-1 md:mb-0 md:w-1/3">
                  <label htmlFor="forms-labelLeftInputCode">Full name</label>
                </div>
                <div className="md:w-2/3 md:flex-grow">
                  <Input type="email" name="email" />
                </div>
              </div>
            </div> */
}

export default Input
