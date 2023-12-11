import { useState } from 'react'
import styles from './common.module.css'

import { Button, Modal } from 'antd'

export default ({ show = false, toggle, start, finish }) => {
  const [val, setval] = useState({
    start: start || 0,
    finish: finish || 0
  })
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
      >
        确认
      </Button>
    </Modal>
  )
}
