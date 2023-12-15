import { useStore } from '@/store'
import { SunOne, Moon } from '@icon-park/react'
import Transition from '@/components/Transition'
import CuIcon from '@/components/cuIcon'
import { useViewDataStore } from '@/store/viewdata'

export default props => {
  const { store, setThemeToggle, setValueStore } = useStore()
  const { setNovelStore } = useViewDataStore()

  return (
    <>
      <header className='zaiheader' style={props.style}>
        <CuIcon
          icon='cascades'
          size='34'
          color='var(--success-color)'
          onClick={() => {
            setValueStore({ isSettingTwo: !store.isSettingTwo })
          }}
        />

        <div className='header-current flex'>
          <CuIcon
            icon='roundadd'
            className='ml-20'
            size='34'
            color='var(--success-color)'
            onClick={() => {
              setValueStore({ isAddDrawer: !store.isAddDrawer })
              setNovelStore({ action: 'add' })
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
