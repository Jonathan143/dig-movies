<template>
  <Container :active="3">
    <div class="bg-cover bg-no-repeat h-65 w-full px-6 pt-20 my__header">
      <div
        class="flex m-auto bg-light-50 rounded-1/2 h-27 text-0 w-27 overflow-hidden items-center justify-center">
        <image
          v-if="userStore.avatar"
          class="h-full w-full"
          :src="userStore.avatar" />
        <span v-else class="text-12px" @click="onLoginClick">点击授权</span>
      </div>

      <div class="mt-6.5 text-center text-light-50 text-26px">
        {{ userStore.username }}
      </div>
    </div>

    <div class="rounded-12px mx-4 mt-2 overflow-hidden">
      <a-cell label="关于掘影" :value="appVersion">
        <template #leftIcon>
          <a-icon name="twemoji:cowboy-hat-face" multicolor />
        </template>
      </a-cell>
    </div>
  </Container>
</template>

<script setup lang="ts">
import Container from './components/Container.vue'

const userStore = useUserStore()
const appVersion = `版本${uni.getAccountInfoSync().miniProgram.version}`

async function onLoginClick() {
  const { userInfo } = await wx.getUserProfile({ desc: '仅用于页面展示' })
  const { avatarUrl, nickName } = userInfo

  userStore.setInfo({
    avatar: avatarUrl,
    username: nickName,
  })

  console.log(userInfo)
}

onLoad(() => {})

onShareAppMessage(() => ({
  title: '',
  path: '/pages/home/home',
  imageUrl: 'https://yun.yang143.cn/dig-movies/undraw_netflix.png',
}))
</script>

<style lang="scss" scoped>
.my__header {
  background-image: url(https://api.isoyu.com/bing_images.php);
}
</style>
