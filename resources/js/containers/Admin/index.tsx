import React, { useState } from 'react'
import classNames from 'classnames'

import { MdHome, MdKeyboardArrowRight, MdMenu } from 'react-icons/md'
import { BsDot } from 'react-icons/bs'

import Layout from '@/containers/Layout'
import LanguageSwitch from '@/components/LanguageSwitch'
import UserDropdown from '@/components/UserDropdown'

import Sidebar from './Sidebar'
import { Link } from '@inertiajs/inertia-react'

type AdminProps = {
  children: React.ReactNode
  breadcrumbs: Array<{
    label: string
    url: string
  }>
  actions?: React.ReactNode
}

const Admin = ({ children, breadcrumbs, actions }: AdminProps) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true)

  const handleClose = () => setSidebarIsOpen(false)
  const handleOpen = () => setSidebarIsOpen(true)
  const handleToggle = () => setSidebarIsOpen(!sidebarIsOpen)

  return (
    <Layout>
      <Sidebar
        isOpen={sidebarIsOpen}
        handleClose={handleClose}
        handleOpen={handleOpen}
      />
      <div className="fixed top-0 right-0 left-0 z-10 mx-auto bg-white">
        <div
          className={classNames(
            'transition-all transform',
            sidebarIsOpen && 'sm:ml-72'
          )}
        >
          {/* Header */}
          <div className="flex items-center md:justify-start md:space-x-10 h-16 px-5 border-b border-gray-100">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <button
                type="button"
                className="focus:outline-none"
                onClick={handleToggle}
              >
                <MdMenu className="w-6 h-6" />
              </button>
            </div>
            <div className="flex items-center justify-end md:flex-1 lg:w-0">
              <LanguageSwitch />
              <UserDropdown />
            </div>
          </div>
          {/* Subheader */}
          <div className="flex items-center justify-between h-14 px-5 shadow-lg">
            <ol className="text-sm text-gray-400 list-none p-0 space-x-3 flex items-center">
              <li className="flex items-center">
                <MdHome className="w-6 h-6" />
              </li>
              {breadcrumbs.map((item, index) => (
                <React.Fragment key={index}>
                  <li className="flex items-center">
                    <MdKeyboardArrowRight className="w-6 h-6" />
                  </li>
                  <li className="flex items-center">
                    <Link href={item.url}>{item.label}</Link>
                  </li>
                </React.Fragment>
              ))}
            </ol>
            <div className="flex-none">
              <div className="flex justify-items-end">{actions}</div>
            </div>
          </div>
        </div>
      </div>
      {/* TODO: Ajust margins */}
      <div
        className={classNames(
          'p-6 mt-32 transition-all transform',
          sidebarIsOpen && 'sm:ml-72'
        )}
      >
        <main
          className={classNames(
            'transition-all transform',
            sidebarIsOpen ? 'sm:mx-28' : 'sm:mx-52'
          )}
        >
          {children}
        </main>
      </div>
    </Layout>
  )
}

export default Admin
