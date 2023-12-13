import { useState } from 'react'
import styles from './common.module.css'

import { Button, Modal } from 'antd'
import http from '@/utlis/http'
import { useUpdateEffect } from 'ahooks'

export default (props) => {
  const { show = false, toggle, change, id, title } = props

  const [val, setval] = useState({
    start: '',
    finish: ''
  })

  useUpdateEffect(() => {
    setval({
      start: props.start ?? '',
      finish: props.finish ?? ''
    })
  }, [show])

  const updateChapter = async () => {
    const response = await http
      .post('/curd-mongo/update/novel', {
        where: {
          _id: id
        },
        data: {
          $set: {
            start: val.start,
            finish: val.finish
          }
        }
      })
      .catch((e) => {
        window.$message.error('修改失败')
        return Promise.reject(e)
      })
    if (response?.acknowledged) {
      change &&
        change(({ novel }, setNovel) => {
          console.log(novel, setNovel)
          const findindex = novel.novelList.findIndex((fv) => fv._id === id)
          novel.novelList[findindex].start = val.start
          novel.novelList[findindex].finish = val.finish
          setNovel((v) => ({ ...v, novelList: [].concat(novel.novelList) }))
        })
      window.$message.success('修改成功')
    } else {
      window.$message.error('修改失败')
    }
  }

  return (
    <Modal
      open={show}
      onOk={toggle}
      onCancel={toggle}
      title='是否读完：'
    >
      
    </Modal>
  )
}
