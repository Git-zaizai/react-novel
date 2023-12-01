/**
 *
 * @param {Object} Obj
 * @returns {string}
 */
export function jsonToUrlParam(Obj) {
  return new URLSearchParams(Obj).toString()
}

/**
 * @function request
 * @name request
 * @param {{
 * method:'get' | 'post'
 * bacsURL: string
 * url: string
 * data: any
 * requsetType: 'json' | 'form'
 * responseType: 'json' | 'text' | 'blob'
 * }} options
 * @returns {Promise<any>}
 */
async function request(options) {
  const { method, data, url, bacsURL, requsetType = 'json', ...opts } = options

  let config = {
    ...opts,
    url: /https?:\/\//.test(url) ? url : bacsURL + url,
    headers: null,
    method: method.toUpperCase()
  }
  if (requsetType === 'json') {
    config.headers = { 'Content-Type': 'application/json;charset=utf-8' }
  } else {
    config.headers = { 'Content-Type': 'multipart/form-data' }
  }

  if (method === 'get') {
    config.url = config.url + jsonToUrlParam(data)
  } else {
    config.body = JSON.stringify(data)
  }

  try {
    const response = await fetch(config.url, config)
    const responseData = await response.json()
    if (responseData.code === 200) {
      return responseData.data
    }
    return responseData
  } catch (error) {
    console.error(`请求 Request Config:`, config)
    console.error(error)
    return Promise.reject(error)
  }
}

/**
 * @callback get
 * @param {string} url
 * @param {any} data
 * @returns {Promise<any>}
 */
/**
 * @callback post
 * @param {string} url
 * @param {any} data
 * @returns {Promise<any>}
 */
/**
 *
 * @param {string} bacsURL
 * @returns {{
 * bacsURL:string
 * get:get
 * post:post
 * request:request
 * }}
 */
export function createRequest(bacsURL) {
  return {
    bacsURL,
    get: function (url, data) {
      return request({
        bacsURL: this.bacsURL,
        method: 'get',
        url,
        data
      })
    },
    post: function (url, data) {
      return request({
        bacsURL: this.bacsURL,
        method: 'post',
        url,
        data
      })
    },
    request: request
  }
}

export default createRequest(import.meta.env.VITE_GLOB_API_URL)
