import { useMediaQuery } from 'react-responsive'

import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../../../tailwind.config'
// @ts-ignore
const Tailwind = resolveConfig(tailwindConfig)

export const useBreakpoint = (breakpoint: string): boolean => {
  return useMediaQuery({
    query: `(min-width: ${Tailwind.theme.screens[breakpoint]})`
  })
}
