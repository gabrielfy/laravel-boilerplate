import React, { useRef, useState } from 'react'
import classNames from 'classnames'

import Transition from '@/components/Transition'

import { useClickOutside } from '@/hooks'

type DropdownProps = {
  children: React.ReactNode
  align?: 'left' | 'right'
  title: JSX.Element | string
}

const dropdownModifiers = {
  align: (align: string) => `${align}-0`
}

const Dropdown = ({ children, title, align = 'right' }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useClickOutside(ref, () => setIsOpen(false))

  const styles = classNames(
    'origin-top-right absolute mt-2 p-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y z-40',
    dropdownModifiers.align(align)
  )

  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setIsOpen(!isOpen)}>{title}</div>
      <Transition
        show={isOpen}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className={styles}>{children}</div>
      </Transition>
    </div>
  )
}

export * from './DropdownItem'

export * from './DropdownList'

export default Dropdown
