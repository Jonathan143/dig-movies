<template>
  <Container :active="3">
    <div class="my">我的</div>

    <div @click="onLoginClick">登录</div>
  </Container>
</template>

<script setup lang="ts">
import Container from './components/Container.vue'

async function onLoginClick() {
  // const { code } = await wx.login()
  // const res = await request({
  //   url: 'auth/wechat_mini_code2Session',
  //   method: 'POST',
  //   data: { code },
  // })
  const res = await wx.getUserProfile({ desc: '仅用于页面展示' })
  console.log(res)
}
</script>

<style lang="scss" scoped></style>
