import { createGlobalStore } from 'hox'
import http from '@/utlis/http'

const [useAccountStore, getAccountStore] = createGlobalStore(() => {
  const [settingTwoShow, { toggle: toggleSettingTwoShow }] = useToggle(false)
  const [user, setUser] = useState({
    admin: false,
  })

  function setUserStore(obj) {
    setUser(v => ({ ...v, ...obj }))
  }

  const [addDrawerShow, { toggle: toggleAddDrawerShow }] = useToggle(false)
  const [novelFormData, setNovelFormData] = useState({
    action: false,
    data: {},
  })
  const [tabs, setTabs] = useState([])
  const [novleList, setNovelList] = useState([])

  /* useMount(() => {
    http.post('/verify').then(() => {
      setUser({ ...user, admin: true })
    })
  }) */

  return {
    userStore: user,
    setUserStore,
    settingTwoShow,
    toggleSettingTwoShow,
    addDrawerShow,
    toggleAddDrawerShow,
    tabs,
    setTabs,
    novelFormData,
    setNovelFormData,
    novleList,
    setNovelList,
  }
})

export const useStore = useAccountStore
export const getStore = getAccountStore
