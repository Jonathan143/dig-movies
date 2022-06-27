<template>
  <Container :active="1">
    <view @click="visible = !visible">like</view>

    <a-button
      v-for="modeItem of modeList"
      :key="modeItem"
      class="mr-2"
      @click="onModeItemClick(modeItem)">
      {{ modeItem }}
    </a-button>

    <a-popup v-model="visible" :mode="mode">
      <div class="h-full bg-blue-400 min-h-40 min-w-40 w-full text-light-50">
        123
      </div>
    </a-popup>
  </Container>
</template>

<script setup lang="ts">
import Container from './components/Container.vue'

const visible = ref(false)
const modeList = ['left', 'right', 'top', 'bottom', 'center']
const mode = ref('buttom')

function onModeItemClick(modeItem: string) {
  mode.value = modeItem
  visible.value = !visible.value
}
</script>

<style></style>
