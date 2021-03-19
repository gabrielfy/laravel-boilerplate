import React from 'react'

import LanguageSwitch from '@/components/LanguageSwitch'
import UserDropdown from '@/components/UserDropdown'
import Layout from '@/containers/Layout'

type AppProps = {
  children: React.ReactNode
}

const App = ({ children }: AppProps) => {
  return (
    <Layout>
      <div className="bg-gray-100 h-full">
        <div className="relative bg-white">
          <div className="w-full flex items-center px-4 border-b border-gray-100 h-16 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="#">
                <span className="sr-only">Workflow</span>
                <img
                  className="h-8 w-auto sm:h-10"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt=""
                />
              </a>
            </div>
            <div className="flex items-center justify-end md:flex-1 lg:w-0">
              <LanguageSwitch />
              <UserDropdown />
            </div>
          </div>
        </div>
        <div className="sm:mx-52 mt-5">{children}</div>
      </div>
    </Layout>
  )
}

export default App
