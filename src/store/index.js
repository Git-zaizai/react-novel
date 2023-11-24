import { createGlobalStore } from 'hox'
import { useState } from 'react'
import { setRootCss } from '@/styles/cssVars'
import { checkIsDarkMode } from '@/utlis'

const windowTheme = checkIsDarkMode()
setRootCss(windowTheme ? 'light' : 'dark')

const [useAccountStore, getAccountStore] = createGlobalStore(() => {
  const [state, setState] = useState({
    theme: windowTheme,
    nprogress: false
  })

  function setThemeToggle(value) {
    setState((v) => {
      const res = { ...v, theme: value ?? !v.theme }
      setRootCss(res.theme ? 'light' : 'dark')
      return res
    })
  }

  function nprogressToggle() {
    setState((v) => ({ ...v, nprogress: !v.nprogress }))
  }

  return { store: state, setThemeToggle, nprogressToggle }
})

export const useStore = useAccountStore
export const getStore = getAccountStore
