import React, { useEffect } from 'react'

import { MdClose, MdDashboard, MdPeople } from 'react-icons/md'
import { FaUserLock } from 'react-icons/fa'
import { useBreakpoint } from '@/hooks'

import Transition from '@/components/Transition'
import SidebarItem from './SidebarItem'
import SidebarDivider from './SidebarDivider'

type SidebarProps = {
  isOpen?: boolean
  handleClose: () => void
  handleOpen: () => void
}

// TODO: Save state to local storage
const Sidebar = ({ isOpen = true, handleClose, handleOpen }: SidebarProps) => {
  const isGreaterThanSm = useBreakpoint('sm')

  useEffect(() => {
    if (isGreaterThanSm) {
      handleOpen()
    } else {
      handleClose()
    }
  }, [isGreaterThanSm])

  return (
    <>
      {!isGreaterThanSm && isOpen && (
        <div
          className="fixed z-30 inset-0 bg-black opacity-50 block sm:hidden"
          onClick={handleClose}
        ></div>
      )}
      <Transition
        show={isOpen}
        enter="transition-all transform duration-150"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition-all transform duration-150"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <div className="flex flex-col z-40 fixed inset-0 overflow-y-auto h-screen w-72 bg-gray-800">
          <div className="flex items-center justify-between px-8 bg-gray-900 h-16">
            <h1 className="uppercase text-xl font-semibold text-gray-200">
              Laravel
            </h1>
            <button
              type="button"
              className="block sm:hidden text-gray-200 focus:outline-none"
              onClick={handleClose}
            >
              <MdClose className="w-6 h-6" />
            </button>
          </div>
          <ul className="flex flex-col w-full p-4 space-y-2">
            <SidebarDivider name="General" />

            <SidebarItem
              href={route('admin.dashboard')}
              icon={MdDashboard}
              active={route().current('admin.dashboard')}
            >
              Dashboard
            </SidebarItem>

            <SidebarItem
              href={route('admin.users.index')}
              icon={MdPeople}
              active={route().current('admin.users.*')}
            >
              Users
            </SidebarItem>
            <SidebarItem
              href={route('admin.roles.index')}
              icon={FaUserLock}
              active={route().current('admin.roles.*')}
            >
              Roles
            </SidebarItem>
          </ul>
        </div>
      </Transition>
    </>
  )
}

export default Sidebar
