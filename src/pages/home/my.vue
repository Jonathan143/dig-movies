<template>
  <Container :active="3">
    <div class="bg-cover bg-no-repeat h-65 w-full px-6 pt-24 my__header">
      <div
        class="flex bg-light-50 rounded-1/2 h-16 text-0 w-16 overflow-hidden items-center justify-center">
        <image
          v-if="userStore.avatar"
          class="h-full w-full"
          :src="userStore.avatar" />
        <span v-else class="text-12px" @click="onLoginClick">点击授权</span>
      </div>
    </div>
  </Container>
</template>

<script setup lang="ts">
import Container from './components/Container.vue'

const userStore = useUserStore()

async function onLoginClick() {
  const { userInfo } = await wx.getUserProfile({ desc: '仅用于页面展示' })
  const { avatarUrl, nickName } = userInfo

  userStore.setInfo({
    avatar: avatarUrl,
    username: nickName,
  })
  console.log(userInfo)
}
</script>

<style lang="scss" scoped>
.my__header {
  background-image: url(https://api.isoyu.com/bing_images.php);
}
</style>
