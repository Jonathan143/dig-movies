<template>
  <div class="index">
    <div @click="onLoginClick">登录</div>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore()

const socketId = ref('')

async function onLoginClick() {
  if (!userStore.username) {
    await getUserProfile()
  }
  const { username, avatar, openid } = userStore

  const data = await request({
    url: 'auth/wechat_mini_OAuth2',
    data: { socketId: socketId.value, nickname: username, avatar, openid },
    method: 'POST',
  })
}

async function getUserProfile() {
  try {
    const { userInfo } = await wx.getUserProfile({ desc: '仅用于页面展示' })
    const { avatarUrl, nickName } = userInfo

    userStore.setInfo({
      avatar: avatarUrl,
      username: nickName,
    })
  } catch (error) {
    await uni.showModal({
      title: '请同意授权',
      content: '用户信息仅用于页面展示',
      showCancel: false,
    })
    await onLoginClick()
  }
}

onLoad(({ scene = '1234' }) => {
  scene
    ? (socketId.value = scene)
    : uni.showToast({ title: '参数错误', icon: 'error' })
})
</script>
