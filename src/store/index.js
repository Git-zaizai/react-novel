import { createGlobalStore } from 'hox'
import { useState } from 'react'
import { setRootCss } from '@/styles/cssVars'
import { checkIsDarkMode, getThemeToken } from '@/utlis/themeColor'

const [useAccountStore, getAccountStore] = createGlobalStore(() => {
  const [laoutState, setlaoutState] = useState({
    theme: false,
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
    setlaoutState(v => ({ ...v, ...obj }))
  }

  function setThemeToggle(value) {
    setlaoutState(v => {
      const res = { ...v, theme: value ?? !v.theme }
      res.themeToken = getThemeToken(v.theme)
      setRootCss(res.theme ? 'light' : 'dark')
      return res
    })
  }

  function nprogressToggle() {
    setlaoutState(v => ({ ...v, nprogress: !v.nprogress }))
  }

  const [user, setUser] = useState({
    admin: false
  })
  function setUserStore(obj) {
    setUser(v => ({ ...v, ...obj }))
  }

  return {
    store: laoutState,
    setValueStore,
    setThemeToggle,
    nprogressToggle,
    userStore: user,
    setUserStore
  }
})

export const useStore = useAccountStore
export const getStore = getAccountStore
