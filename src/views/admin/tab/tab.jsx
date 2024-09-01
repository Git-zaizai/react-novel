import styles from './tab.module.css'

import TabManage from './tab-manage'
import ApplyForTabs from './Apply-for-tabs'

export default () => {
  return (
    <>
      <div className={styles.view + ' h-100-vh'}>
        <div style={{ height: 'calc(var(--Header-height) + 10px)' }}></div>
        <TabManage />
        <ApplyForTabs />
      </div>
    </>
  )
}
