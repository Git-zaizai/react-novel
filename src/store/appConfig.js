import { createStore } from 'hox'
import { setRootCss } from '@/styles/cssVars'

const CustomizeTheme = {
  dark: {
    colorPrimary: '#63e2b7',
    colorInfo: '#63e2b7',
    colorSuccess: '#63e2b7'
  },
  light: {
    colorPrimary: '#18a058',
    colorInfo: '#18a058',
    colorSuccess: '#18a058'
  }
}

export const [useAppStore, AppConfigStoreProvider] = createStore(() => {
  const [appTheme, setAppTheme] = useState({
    theme: false,
    themeToken: {
      colorPrimary: '#63e2b7',
      colorInfo: '#63e2b7',
      colorSuccess: '#63e2b7'
    }
  })
  function setThemeToggle(value) {
    setAppTheme(v => {
      const res = { ...v, theme: value ?? !v.theme }
      res.themeToken = CustomizeTheme[v.theme]
      setRootCss(res.theme ? 'light' : 'dark')
      return res
    })
  }
  return { appTheme, setAppTheme, setThemeToggle }
})
