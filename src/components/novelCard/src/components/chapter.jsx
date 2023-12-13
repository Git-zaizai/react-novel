import { useState } from 'react'
import styles from './common.module.css'

import { Button, Modal } from 'antd'
import http from '@/utlis/http'
import { useUpdateEffect } from 'ahooks'

export default (props) => {
  const { show = false, toggle, change, id } = props

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
      .post('/react/novel/update', {
        _id: id,
        start: val.start,
        finish: val.finish
      })
      .catch((e) => {
        window.$message.error('修改失败')
        return Promise.reject(e)
      })
    if (response) {
      change &&
        change(({ novel }, setNovel) => {
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
      centered
      closeIcon={false}
      title='章节修改：'
      footer={null}
    >
      <Space.Compact
        size='large'
        className='w-100 mt-10'
      >
        <Input
          addonBefore='第'
          placeholder='0'
          className='text-align'
          allowClear
          value={val.start}
          onChange={(e) => setval((v) => ({ ...v, start: e.target.value }))}
        />
        <div className={styles.chapter + ' flex-fdc-aic-juc'}></div>
        <Input
          allowClear
          addonAfter='章'
          placeholder='*'
          className='text-align'
          value={val.finish}
          onChange={(e) => setval((v) => ({ ...v, finish: e.target.value }))}
        />
      </Space.Compact>

      <Button
        type='primary'
        block
        className='mt-10'
        onClick={updateChapter}
      >
        确认
      </Button>
    </Modal>
  )
}
