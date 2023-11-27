import { createGlobalStore } from 'hox'
import { useState } from 'react'
import { setRootCss } from '@/styles/cssVars'
import { checkIsDarkMode } from '@/utlis'

const windowTheme = checkIsDarkMode()

const [useAccountStore, getAccountStore] = createGlobalStore(() => {
  const [state, setState] = useState({
    theme: windowTheme,
    nprogress: false,
    mainScroll: false
  })

  function setValueStore(obj) {
    setState(v => ({ ...v, ...obj }))
  }

  function setThemeToggle(value) {
    setState(v => {
      const res = { ...v, theme: value ?? !v.theme }
      setRootCss(res.theme ? 'light' : 'dark')
      return res
    })
  }

  function nprogressToggle() {
    setState(v => ({ ...v, nprogress: !v.nprogress }))
  }

  return { store: state, setValueStore, setThemeToggle, nprogressToggle }
})

export const useStore = useAccountStore
export const getStore = getAccountStore
