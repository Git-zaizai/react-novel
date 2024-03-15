import dayjs from 'dayjs'
import { randomHexColor } from '@/utlis/themeColor'

export function rand(m, n) {
  return Math.ceil(Math.random() * (n - m + 1) + m - 1)
}
export function randList(arr) {
  const leng = rand(0, arr.length - 1)
  const result = []
  let i = 0
  while (i < leng) {
    let index = rand(0, leng)
    let push = arr[index]
    if (result.some(v => v.tab === push)) {
      continue
    } else {
      result.push({
        tab: push,
        color: randomHexColor()
      })
      ++i
    }
  }
  return result
}

let i = 0
export const CreateNovelData = () => {
  i++
  return {
    _id: i,
    beizhu: Math.random().toString(36).slice(2, 12),
    start: (Math.random() * 10).toFixed(), // 开始章节
    finish: (Math.random() * 10 * 10).toFixed(), // 结束章节
    duwan: Math.round(Math.random()), // 是否读完
    isdel: Math.round(Math.random()), // 软删除
    wanjie: Math.round(Math.random()),
    link: Math.random().toString(36).slice(2, 12), //首链接
    linkback: Math.random().toString(36).slice(2, 12), //后续链接
    title: Math.random().toString(36).slice(2, 12),
    links: [
      {
        linkName: Math.random().toString(36).slice(2, 12),
        urli: Math.random().toString(36).slice(2, 12)
      }
    ], // 链接
    tabs: randList(['小说', '推荐', '漫画', '动漫', '有声小说', '一口气看完', '其他']), // 标签列表
    rate: [(Math.random() * 10).toFixed()], // 评分
    addDate: dayjs().subtract(rand(0, 365), 'day').toDate(),
    update: dayjs().subtract(rand(0, 265), 'day').toDate(),
    finishtime: dayjs().subtract(rand(0, 165), 'day').toDate()
  }
}

export function waitTime(time = 1000) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

export const waitRandomTime = async (time = 0) => {
  let b = rand(0, 10) * 100
  let q = rand(0, time) * 1000
  await waitTime(b + q)
  return b + q
}

export const RandCreateList = (leng = 10) => {
  return new Promise(async resolve => {
    let list = Array.from({ length: leng }).map(() => {
      return CreateNovelData()
    })
    await waitRandomTime()
    resolve(list)
  })
}
