<template>
  <view
    class="flex bg-light-50 bg-opacity-70 rounded-63px h-63px px-10px transform bottom-26px left-1/2 w-260px -translate-x-1/2 backdrop-filter items-center justify-between fixed tabbar-shadow backdrop-blur-40">
    <view
      v-for="(tabItem, index) of tabList"
      :key="index"
      class="flex rounded-1/2 h-52px text-hex-666 w-52px items-center justify-center"
      :class="{
        'text-indigo-500': active === index,
      }"
      @click="onItemClick(tabItem, index)">
      <view class="text-22px iconfont" :class="tabItem.iconfont"></view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useRouter } from '@/hooks'

interface TabItem {
  iconfont: string
  path: string
}

const props = defineProps<{ active: number }>()

const tabList = [
  {
    iconfont: 'icon-movies',
    path: '/pages/home/home',
  },
  {
    iconfont: 'icon-heart',
    path: '/pages/home/like',
  },
  {
    iconfont: 'icon-Notifications',
    path: '/pages/home/message',
  },
  {
    iconfont: 'icon-Profile',
    path: '/pages/home/my',
  },
]

const router = useRouter()

function onItemClick(tabItem: TabItem, index: number) {
  if (props.active === index) return
  router.switchTab(tabItem.path)
}
</script>

<style lang="scss" scoped>
.tabbar-shadow {
  box-shadow: 0px -2px 8px rgba(0, 0, 0, 0.08);
}
</style>
