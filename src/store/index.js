import { createGlobalStore } from 'hox'
import http from '@/utlis/http'

const [useAccountStore, getAccountStore] = createGlobalStore(() => {
  const [settingTwoShow, { toggle: toggleSettingTwoShow }] = useToggle(false)
  const [user, setUser] = useState({
    admin: false,
    name: '',
  })

  function setUserStore(obj) {
    setUser(v => ({ ...v, ...obj }))
  }

  const [addDrawerShow, { toggle: toggleAddDrawerShow }] = useToggle(false)
  const [novelFormData, setNovelFormData] = useState({
    action: 'add', // add update
    data: null,
  })

  const initUserVerify = async () => {
    if (localStorage.getItem('token')) {
      await http.post('/verify').catch(() => {
        localStorage.removeItem('token')
        window.$message.warning('请重新登录')
      })
      user.admin = true
      let res = await http.get('/verifyUser')
      if (res === 'root') {
        user.name = res
      }
      setUser({ ...user })
    }
  }

  useMount(() => {
    initUserVerify()
  })

  return {
    userStore: user,
    setUserStore,
    settingTwoShow,
    toggleSettingTwoShow,
    addDrawerShow,
    toggleAddDrawerShow,
    novelFormData,
    setNovelFormData,
    initUserVerify,
  }
})

export const useStore = useAccountStore
export const getStore = getAccountStore
