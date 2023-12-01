import { createGlobalStore } from 'hox'
import { useState } from 'react'
import { setRootCss } from '@/styles/cssVars'
import { checkIsDarkMode, getThemeToken } from '@/utlis/themeColor'

const [useAccountStore, getAccountStore] = createGlobalStore(() => {
  const [state, setState] = useState({
    theme: checkIsDarkMode(),
    themeToken: {
      colorPrimary: '#18a058',
      colorInfo: '#18a058',
      colorSuccess: '#18a058'
    },
    isAddDrawer: false,
    nprogress: false,
    mainScroll: false,
    isSettingTwo: false
  })

  function setValueStore(obj) {
    setState((v) => ({ ...v, ...obj }))
  }

  function setThemeToggle(value) {
    setState((v) => {
      const res = { ...v, theme: value ?? !v.theme }
      res.themeToken = getThemeToken(v.theme)
      setRootCss(res.theme ? 'light' : 'dark')
      return res
    })
  }

  function nprogressToggle() {
    setState((v) => ({ ...v, nprogress: !v.nprogress }))
  }

  return { store: state, setValueStore, setThemeToggle, nprogressToggle }
})

export const useStore = useAccountStore
export const getStore = getAccountStore
