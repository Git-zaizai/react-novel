import { useStore } from '@/store'

export default () => {
  const { store, setValueStore } = useStore()

  return (
    <Drawer
      title='设置'
      placement='left'
      open={store.isSettingTwo}
      onClose={() => setValueStore({ isSettingTwo: !store.isSettingTwo })}
      width='80vw'
    ></Drawer>
  )
}
