<template>
  <div
    class="flex bg-dark-900 bg-opacity-30 rounded-1/2 text-fff left-4 text-20px text-light-50 z-index-99 a-navbar fixed items-center justify-center"
    :style="navbarStyle"
    @click="onBackClick">
    <a-icon :name="`bi:${isGoHome ? 'house-door' : 'arrow-left-short'}`" />
  </div>
</template>

<script setup lang="ts">
const { top, height } = wx.getMenuButtonBoundingClientRect()
const navbarStyle = {
  top: `${top}px`,
  height: `${height}px`,
  width: `${height}px`,
}

const router = useRouter()

const isGoHome = getCurrentPages().length === 1

function onBackClick() {
  isGoHome ? router.replace('/pages/home/home') : router.go()
}
</script>

<style lang="scss"></style>
