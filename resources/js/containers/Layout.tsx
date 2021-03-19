import React, { useMemo } from 'react'
import { ToastContainer } from 'react-toastify'

import { ThemeProvider } from '@/contexts/ThemeContext'
import themeDefault from '@/styles/theme'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const value = useMemo(
    () => ({
      theme: themeDefault
    }),
    [themeDefault]
  )

  return (
    <ThemeProvider value={value}>
      <ToastContainer />
      {children}
    </ThemeProvider>
  )
}

export default Layout
