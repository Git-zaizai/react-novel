import { useStore } from '@/store'
import { useAppStore } from '@/store/appConfig'

import { SunOne, Moon } from '@icon-park/react'
import { WindowsOutlined } from '@ant-design/icons'
import Transition from '@/components/Transition'
import CuIcon from '@/components/cuIcon'
import { useViewDataStore } from '@/store/viewdata'

export default () => {
  logComponents('Header')

  const { toggleSettingTwoShow, toggleAddDrawerShow } = useStore()
  const { appTheme, setThemeToggle } = useAppStore()
  const { toggleNovelFormView } = useViewDataStore()

  const oponNovelFormClick = useCallback(() => {
    toggleAddDrawerShow()
    setNovelStore({ action: 'add' })
  }, [])

  return (
    <>
      <header className="zaiheader">
        <CuIcon
          icon="cascades cursor-pointer"
          size="34"
          color="var(--success-color)"
          onClick={toggleSettingTwoShow}
        />

        <div className="header-current flex">
          <CuIcon
            icon="roundadd"
            className="ml-20 cursor-pointer"
            size="34"
            color="var(--success-color)"
            onClick={oponNovelFormClick}
          />
        </div>
        <Link to="/wol">
          <WindowsOutlined style={{ color: 'var(--success-color)', fontSize: '38px', marginRight: '20px' }} />
        </Link>
        <Transition show={appTheme.theme}>
          {appTheme.theme ? (
            <SunOne
              className="el-transition-color header-rigth cursor-pointer"
              theme="outline"
              size="32"
              fill="var(--success-color)"
              onClick={setThemeToggle}
            />
          ) : (
            <Moon
              className="el-transition-color header-rigth cursor-pointer"
              theme="outline"
              size="32"
              fill="var(--success-color)"
              onClick={setThemeToggle}
            />
          )}
        </Transition>
      </header>
    </>
  )
}
