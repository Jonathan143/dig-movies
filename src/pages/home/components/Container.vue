<template>
  <div class="h-full w-full">
    <slot></slot>

    <TabBar :active="active" />
  </div>
</template>

<script setup lang="ts">
import TabBar from './Tabbar.vue'

defineProps<{ active: number }>()

uni.hideTabBar()
</script>

<style lang="scss" scoped></style>
