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
