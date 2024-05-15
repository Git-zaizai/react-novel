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

export function randomHexColor() {
  //随机生成十六进制颜色
  var hex = Math.floor(Math.random() * 16777216).toString(16) //生成ffffff以内16进制数
  while (hex.length < 6) {
    //while循环判断hex位数，少于6位前面加0凑够6位
    hex = '0' + hex
  }
  return '#' + hex //返回‘#'开头16进制颜色
}
