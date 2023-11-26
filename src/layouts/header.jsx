import { useStore } from '@/store'
import { AppstoreOutlined } from '@ant-design/icons'
import { SunOne, Moon } from '@icon-park/react'
import Transition from '@/components/Transition'

export default (props) => {
  const { store, setThemeToggle } = useStore()

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
        <div className='header-current'>
        
        </div>
        <Transition show={store.theme}>
          {store.theme ? (
            <SunOne
              className='el-transition-color'
              theme='outline'
              size='32'
              fill='var(--success-color)'
              onClick={() => setThemeToggle()}
            />
          ) : (
            <Moon
              className='el-transition-color'
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
