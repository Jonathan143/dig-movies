<template>
  <div class="flex flex-wrap">
    <div v-for="icon of iconList" :key="icon" class="p-2 text-32px">
      <a-icon :name="`line-md:${icon}`" />
    </div>
  </div>

  <div class="flex justify-center">
    <div
      class="rounded m-auto bg-blue-500 mt-6 py-3 px-3 text-light-50 text-12px inline-block"
      @click="onLoadMoreClick">
      load more
    </div>
  </div>
</template>

<script setup lang="ts">
import iconJson from '@/components/a-icon/icon.json'

const iconList = ref(iconJson.slice(0, 20))
const page = {
  index: 1,
  size: 20,
  total: iconJson.length,
}

function onLoadMoreClick() {
  const { index, size, total } = page
  const length = iconList.value.length
  if (length >= total) {
    uni.showToast({ icon: 'none', title: '没有更多了' })
    return
  }
  iconList.value = [
    ...iconList.value,
    ...iconJson.slice(index * size, size + length),
  ]
  page.index++
}
</script>

<style></style>
