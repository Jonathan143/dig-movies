<template>
  <div class="flex flex-col h-full pt-40 items-center">
    <div class="h-56 text-0 w-60">
      <image
        v-if="isLoginSuccessful"
        class="h-full w-full"
        src="@/static/img/login-success.svg" />
      <image v-else class="h-full w-full" src="@/static/img/scan-qr-code.png" />
    </div>
    <div v-if="isLoginSuccessful" class="mt-4 text-blue-500">登录成功</div>
    <a-button v-else @click="onLoginClick">授权登录</a-button>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore()

const socketId = ref('')
const isLoggingIn = ref(false)
const isLoginSuccessful = ref(false)

async function onLoginClick() {
  if (isLoggingIn.value) return
  if (!userStore.username) {
    await getUserProfile()
  }

  saveOAuth2()
}

async function saveOAuth2() {
  if (isLoggingIn.value) return

  uni.showLoading({ title: '登录中...' })
  isLoggingIn.value = true
  const { username, avatar, openid } = userStore
  const [error, data] = await request({
    url: 'auth/wechat_mini_OAuth2',
    data: { socketId: socketId.value, nickname: username, avatar, openid },
    method: 'POST',
  })
  if (!error) {
    isLoginSuccessful.value = true
  }
  isLoggingIn.value = false
  uni.hideLoading()
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

function updateScanCodeState() {
  request({
    url: 'auth/wechat_mini_updateScanCodeState',
    data: { code: socketId.value },
    method: 'GET',
  })
}

onLoad(({ scene = '' }) => {
  if (scene) {
    socketId.value = scene
    updateScanCodeState()
  } else {
    uni.showToast({ title: '参数错误', icon: 'error' })
  }
})
</script>
