<template>
  <view
    class="bg-hex-fff flex rounded-63px h-63px left-half px-10px transform -translate-x-half bottom-26px w-315px tab-bar items-center justify-between fixed">
    <view
      v-for="(tabItem, index) of tabList"
      :key="index"
      class="rounded-half flex h-52px text-gray-400 w-52px items-center justify-center"
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
