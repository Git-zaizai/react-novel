import { useStore } from '@/store'
import { AppstoreOutlined } from '@ant-design/icons'
import { SunOne, Moon } from '@icon-park/react'
import Transition from '@/components/Transition'
import CuIcon from '@/components/cuIcon'

export default (props) => {
  const { store, setThemeToggle, setValueStore } = useStore()

  return (
    <>
      <header
        className='zaiheader'
        style={props.style}
      >
        <AppstoreOutlined
          className='el-transition-color'
          style={{
            fontSize: '34px',
            color: 'var(--success-color)'
          }}
        />
        <div className='header-current flex'>
          <CuIcon
            icon='roundadd'
            size='36'
            color='var(--success-color)'
            style={{
              marginLeft: '20px'
            }}
            onClick={() => {
              setValueStore({ isAddDrawer: !store.isAddDrawer })
            }}
          />
        </div>
        <Transition show={store.theme}>
          {store.theme ? (
            <SunOne
              className='el-transition-color header-rigth'
              theme='outline'
              size='32'
              fill='var(--success-color)'
              onClick={() => setThemeToggle()}
            />
          ) : (
            <Moon
              className='el-transition-color header-rigth'
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
