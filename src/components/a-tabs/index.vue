<template>
  <div
    class="rounded flex w-full p-1 a-tabs items-center relative"
    :style="{ background: bgColor }">
    <!-- 滑块 -->
    <div
      class="rounded transition-transform top-1 left-1 duration-300 absolute"
      :style="[sliderStyle, { background: sliderBg }]"></div>

    <div
      v-for="(item, index) of list"
      id="a-tab-item"
      :key="index"
      class="flex-1 flex-shrink-0 text-14px z-1"
      @click="onTabItemClick(item, index)">
      <div
        class="rounded text-center py-2.5"
        :style="{ color: modelValue === index ? activeColor : inactiveColor }">
        {{ item[keyName] }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'

const props = withDefaults(
  defineProps<{
    /**
     * 当前选中项
     */
    modelValue: number
    /**
     * 选项的数组
     */
    list: Record<string, any>[]
    /**
     * 从list元素对象中读取的键名
     *
     * 默认 `name`
     */
    keyName?: string
    /**
     * 未选中的颜色
     */
    inactiveColor?: string
    /**
     * 选中的颜色
     */
    activeColor?: string
    /**
     * 滑块背景色
     *
     * 默认 `#fff`
     * */
    sliderBg?: string
    /**
     * 背景色
     *
     * 默认 `#eee`
     */
    bgColor?: string
  }>(),
  {
    inactiveColor: '#616161',
    activeColor: '#2588ff',
    keyName: 'name',
    sliderBg: '#fff',
    bgColor: '#eee',
  },
)

const emit = defineEmits<{
  (event: 'update:modelValue', index: number): void
  (event: 'change', item: Record<string, any>, index: number): void
}>()

const sliderStyle = ref<CSSProperties>({})

function onTabItemClick(item: Record<string, any>, index: number) {
  if (index === props.modelValue) return

  sliderStyle.value.transform = `translateX(${100 * index}%)`
  emit('update:modelValue', index)
  emit('change', item, index)
}

onMounted(() => {
  const query = uni.createSelectorQuery().in(getCurrentInstance())
  query
    .select('#a-tab-item')
    .boundingClientRect(({ width = 0, height = 0 }) => {
      sliderStyle.value = {
        width: `${width}px`,
        height: `${height}px`,
      }
    })
    .exec()
})
</script>

<style lang="scss"></style>
