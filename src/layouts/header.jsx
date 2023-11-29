import { useStore } from '@/store'
import { SunOne, Moon, SettingTwo, Search } from '@icon-park/react'
import Transition from '@/components/Transition'
import CuIcon from '@/components/cuIcon'

export default props => {
  const { store, setThemeToggle, setValueStore } = useStore()

  return (
    <>
      <header className='zaiheader' style={props.style}>
        <SettingTwo
          className='el-transition-color'
          theme='outline'
          size='32'
          fill='var(--success-color)'
          onClick={() => setValueStore({ isSettingTwo: !store.isSettingTwo })}
        />

        <div className='header-current flex'>
          <CuIcon
            icon='roundadd'
            className='ml-20'
            size='34'
            color='var(--success-color)'
            onClick={() => {
              setValueStore({ isAddDrawer: !store.isAddDrawer })
            }}
          />
          <Search
            className='ml-20'
            theme='outline'
            size='34'
            fill='var(--success-color)'
            onClick={() => setValueStore({ isSearch: !store.isSearch })}
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
