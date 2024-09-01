import { createStore } from 'hox'
import { setRootCss } from '@/styles/cssVars'

const CustomizeTheme = {
  dark: {
    colorPrimary: '#63e2b7',
    colorInfo: '#63e2b7',
    colorSuccess: '#63e2b7',
  },
  light: {
    colorPrimary: '#18a058',
    colorInfo: '#18a058',
    colorSuccess: '#18a058',
  },
}

export const [useAppStore, AppConfigStoreProvider] = createStore(() => {
  const [appTheme, setAppTheme] = useState({
    theme: 'dark', // dark or light
    themeToken: {
      colorPrimary: '#63e2b7',
      colorInfo: '#63e2b7',
      colorSuccess: '#63e2b7',
    },
  })
  function setThemeToggle(value) {
    setAppTheme(v => {
      if (value) {
        value = v.theme === 'dark' ? 'light' : 'dark'
      }
      const res = { ...v, theme: value }
      res.themeToken = CustomizeTheme[value]
      setRootCss(value)
      return res
    })
  }

  useMount(() => {
    setRootCss(appTheme.theme)
  })

  return { appTheme, setAppTheme, setThemeToggle }
})
