import { acceptHMRUpdate, defineStore } from 'pinia'
import type { UserState } from './types'

export const userStoreKey = 'USER_INFO'

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    openid: '',
    token: '',
    id: '',
    userid: '',
    username: '',
    role: 'tourist',
    email: '',
    avatar: '',
    nickname: '',
  }),

  getters: {},

  actions: {
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial)
    },

    async updateUserInfo() {
      const [error, userInfo] = await request<UserState>({
        method: 'GET',
        url: 'user',
      })
      if (!error) {
        this.setInfo(userInfo)
        wx.setStorage({ key: userStoreKey, data: userInfo })
      }
    },

    async loadLocalStore() {
      const data = await wx.getStorageSync(userStoreKey)
      data && this.setInfo(data)
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
