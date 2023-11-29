/**
 * @function 浏览器检测是否为亮色模式
 * @returns
 */
export function checkIsDarkMode() {
  try {
    return window.matchMedia('(prefers-color-scheme: light)').matches
  } catch (err) {
    return false
  }
}

/**
 *
 * @param {boolean} isVal
 * @returns
 */
export function getThemeToken(isVal) {
  return isVal
    ? {
        colorPrimary: '#63e2b7',
        colorInfo: '#63e2b7',
        colorSuccess: '#63e2b7'
      }
    : {
        colorPrimary: '#18a058',
        colorInfo: '#18a058',
        colorSuccess: '#18a058'
      }
}
