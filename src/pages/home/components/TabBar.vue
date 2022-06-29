<template>
  <view
    class="bg-hex-fff flex rounded-63px h-63px shadow px-10px transform bottom-26px left-1/2 w-315px -translate-x-1/2 tab-bar items-center justify-between fixed">
    <view
      v-for="(tabItem, index) of tabList"
      :key="index"
      class="flex rounded-1/2 h-52px text-gray-400 w-52px items-center justify-center"
      :class="{ 'text-blue-700 bg-gray-300': active === index }"
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

<style lang="scss" scoped></style>
