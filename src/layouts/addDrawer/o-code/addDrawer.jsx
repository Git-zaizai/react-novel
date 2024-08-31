import { useStore } from '@/store'
import { isMobile } from '@/utlis'

import NovelAddForm from '../../addDrawer copy 2/novelAddForm'

export default () => {
  const { addDrawerShow, toggleAddDrawerShow, novelFormData } = useStore()

  const submit = callback => {
    callback()
  }

  return (
    <Drawer
      title={novelFormData.action === 'update' ? '修改 Record' : '添加 Record'}
      placement={isMobile() ? 'bottom' : 'right'}
      height="90vh"
      open={addDrawerShow}
      onClose={toggleAddDrawerShow}
      footer={
        <div className="flex-fdc-aic-juc">
          <Button
            type="primary"
            block
            htmlType="submit"
          >
            {novelFormData.action === 'update' ? '修改' : '添加'}
          </Button>
          <Button
            danger
            type="primary"
            block
            className="mt-10"
            onClick={toggleAddDrawerShow}
          >
            返回
          </Button>
        </div>
      }
    >
      {addDrawerShow && <NovelAddForm submit={submit} />}
    </Drawer>
  )
}
