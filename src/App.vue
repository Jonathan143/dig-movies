<script setup lang="ts">
import { userStoreKey } from '@/store/modules'

const userStore = useUserStore()

async function login() {
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
  const page = uni.getLaunchOptionsSync()
  page.path?.startsWith('pages/home') && uni.hideTabBar()

  await userStore.loadLocalStore()
  await login()
})
</script>

<style></style>
