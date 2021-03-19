import React, { createContext } from 'react'
import defaultTheme from '@/styles/theme'

interface ThemeContextInterface {
  theme: typeof defaultTheme
}

export const ThemeContext = createContext<ThemeContextInterface>({
  theme: defaultTheme
})

type ThemeProviderProps = {
  children: React.ReactNode
  value?: any
}

export const ThemeProvider = ({ children, value }: ThemeProviderProps) => {
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
