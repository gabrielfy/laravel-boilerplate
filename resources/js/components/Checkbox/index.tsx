import React, { InputHTMLAttributes, forwardRef } from 'react'

import classNames from 'classnames'

type CheckboxProps = {
  name: string
  color?: 'primary' | 'secondary'
  helpText?: string
  error?: string
} & InputHTMLAttributes<HTMLInputElement>

const checkboxModifiers = {
  color: (color: string) => `text-${color}`,
  error: () => 'border-red-500'
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { children, name, color = 'primary', helpText = '', error = '', ...props },
    ref
  ) => {
    const styles = classNames(
      'focus:ring-transparent h-4 w-4 border-gray-300 rounded',
      checkboxModifiers.color(color),
      !!error && checkboxModifiers.error()
    )

    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id={name}
            name={name}
            type="checkbox"
            className={styles}
            ref={ref}
            {...props}
          />
        </div>
        <div className="ml-3 text-sm">
          <label
            htmlFor={name}
            className="font-medium text-gray-700 select-none"
          >
            {children}
          </label>
          {!!helpText && <p className="text-gray-500">{helpText}</p>}
        </div>
      </div>
    )
  }
)

export default Checkbox
