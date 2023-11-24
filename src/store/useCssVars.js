import { setRootCss } from '@/styles/cssVars'

export const state = {
    value: true,
    theme: setRootCss('theme')
}

export function setTheme(val) {
    state.value = val
    state.theme = setRootCss(val ? 'theme' : 'dark')
}