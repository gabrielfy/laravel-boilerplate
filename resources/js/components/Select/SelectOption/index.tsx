import React from 'react'

type SelectOptionProps = React.OptionHTMLAttributes<HTMLOptionElement>

export const SelectOption = ({
  children,
  value,
  ...props
}: SelectOptionProps) => {
  return (
    <option value={value} {...props}>
      {children}
    </option>
  )
}
