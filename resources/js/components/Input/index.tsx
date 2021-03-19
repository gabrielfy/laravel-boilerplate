import React, { InputHTMLAttributes, forwardRef } from 'react'
import classNames from 'classnames'

export type InputProps = {
  name: string
  label?: string
  icon?: JSX.Element
  helperText?: string
  error?: string
} & InputHTMLAttributes<HTMLInputElement>

const inputModifiers = {
  error: () => 'border-red-500',
  icon: () => 'pl-9'
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { name, label, icon = null, helperText = '', error = '', ...props },
    ref
  ) => {
    const styles = classNames(
      'focus:ring-primary focus:border-primary focus:outline-none block w-full pr-3 py-2 border-gray-300 rounded-lg',
      !!icon ? inputModifiers.icon() : 'pl-3',
      !!error && inputModifiers.error()
    )

    return (
      <div>
        {!!label && (
          <label
            htmlFor={name}
            className="block text-xs font-semibold px-1 text-gray-500"
          >
            {label}
          </label>
        )}
        <div className="mt-1 relative rounded-md shadow-sm">
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

export default Input
