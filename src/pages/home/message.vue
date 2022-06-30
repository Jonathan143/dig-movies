<template>
  <Container :active="2">
    <div class="flex-col flex h-full">
      <div class="flex-shrink-0 px-7 pb-6">
        <div class="font-500 pt-18 pb-10 text-23px">Message</div>

        <div class="w-60">
          <a-tabs
            v-model="activeTab"
            class="tabs-shadow"
            :list="tabList"
            @change="onTabChange" />
        </div>
      </div>

      <div class="bg-light-50 flex-1 overflow-hidden">
        <scroll-view scroll-y class="h-full">
          <div
            class="flex p-6 items-center justify-center"
            style="height: calc(100% - 120px)">
            <image class="h-56 w-60" src="@/static/img/light_the_fire.svg" />
          </div>

          <div class="h-30"></div>
        </scroll-view>
      </div>
    </div>
  </Container>
</template>

<script setup lang="ts">
import Container from './components/Container.vue'

const activeTab = ref(0)
const tabList = ref([
  {
    name: '更新',
  },
  {
    name: '消息',
  },
  {
    name: '活动',
  },
])

function onTabChange(item: Record<string, any>, index: number) {
  console.log(item, index)
}
</script>

<style lang="scss" scoped></style>
