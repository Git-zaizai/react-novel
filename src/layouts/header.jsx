import { useStore } from '@/store'
import { SunOne, Moon } from '@icon-park/react'
import { WindowsOutlined } from '@ant-design/icons'
import Transition from '@/components/Transition'
import CuIcon from '@/components/cuIcon'
import { useViewDataStore } from '@/store/viewdata'
import { useNavigate } from 'react-router-dom'

export default props => {
  const { store, setThemeToggle, setValueStore } = useStore()
  const { setNovelStore } = useViewDataStore()

  const navigate = useNavigate()

  return (
    <>
      <header className='zaiheader' style={props.style}>
        <CuIcon
          icon='cascades cursor-pointer'
          size='34'
          color='var(--success-color)'
          onClick={() => {
            setValueStore({ isSettingTwo: !store.isSettingTwo })
          }}
        />

        <div className='header-current flex'>
          <CuIcon
            icon='roundadd'
            className='ml-20 cursor-pointer'
            size='34'
            color='var(--success-color)'
            onClick={() => {
              setValueStore({ isAddDrawer: !store.isAddDrawer })
              setNovelStore({ action: 'add' })
            }}
          />
        </div>
        <WindowsOutlined
          style={{ color: 'var(--success-color)', fontSize: '38px', marginRight: '20px' }}
          onClick={() => navigate('/wol')}
        />
        <Transition show={store.theme}>
          {store.theme ? (
            <SunOne
              className='el-transition-color header-rigth cursor-pointer'
              theme='outline'
              size='32'
              fill='var(--success-color)'
              onClick={() => setThemeToggle()}
            />
          ) : (
            <Moon
              className='el-transition-color header-rigth cursor-pointer'
              theme='outline'
              size='32'
              fill='var(--success-color)'
              onClick={() => setThemeToggle()}
            />
          )}
        </Transition>
      </header>
    </>
  )
}
