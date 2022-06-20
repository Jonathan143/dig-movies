<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'
import { userStoreKey } from '@/store/modules'

const userStore = useUserStore()

async function login() {
  console.log(userStore)

  if (userStore.openid) return

  const { code } = await wx.login()
  const [error, data] = await request({
    url: 'auth/wechat_mini_code2Session',
    method: 'POST',
    data: { code },
  })
  !error && wx.setStorage({ key: userStoreKey, data })
}

onLaunch(async () => {
  uni.hideTabBar()
  await userStore.loadLocalStore()
  login()
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>

<style></style>
