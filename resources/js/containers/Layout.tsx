import React, { useEffect, useMemo } from 'react'
import { toast, ToastContainer } from 'react-toastify'

import { ThemeProvider } from '@/contexts/ThemeContext'
import themeDefault from '@/styles/theme'
import { usePage } from '@inertiajs/inertia-react'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { status, errors, flash } = usePage().props

  useEffect(() => {
    if (status) {
      toast.info(status)
    }

    if (errors) {
      for (const error in errors) {
        toast.error(errors[error])
      }
    }
  }, [])

  useEffect(() => {
    if (flash.error) {
      toast.error(flash.error)
    }

    if (flash.success) {
      toast.success(flash.success)
    }
  })

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
