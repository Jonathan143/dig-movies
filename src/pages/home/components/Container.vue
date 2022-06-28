<template>
  <div class="h-full w-full">
    <slot></slot>

    <TabBar :active="active" />
  </div>
</template>

<script setup lang="ts">
import TabBar from './TabBar.vue'

defineProps<{ active: number }>()
</script>

<style lang="scss" scoped></style>
