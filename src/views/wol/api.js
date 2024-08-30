import http, { createRequest } from '@/utlis/http'
import dayjs from 'dayjs'
import { awaitTime } from '@/utlis'

export { http }

const { VITE_GLOB_WOL_API_URL, VITE_GLOB_WOL_API_URL_PREFIX } = import.meta.env
export const WOLHTTP = createRequest(VITE_GLOB_WOL_API_URL + VITE_GLOB_WOL_API_URL_PREFIX)

export const getWolAppSend = async (wssid, uuid) => {
  await awaitTime(200)
  let result
  for (let i = 0; i < 10; i++) {
    try {
      const res = await WOLHTTP.get('/selcect-app-messages', {
        wssid: wssid,
        uuid: uuid,
      })
      if (res.code === 1) {
        result = res.data
        break
      }
    } catch {
      result = i
    }
  }

  if (result === undefined || typeof result !== 'number') {
    const msg = result.at(-1)
    result = `收到消息：${msg.data} ${dayjs(msg.date).format('YYYY-MM-DD HH:mm:ss')}`
  } else {
    result = `未收到消息，尝试次数：${result + 1}`
  }

  return result
}
