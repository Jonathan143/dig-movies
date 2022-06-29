<template>
  <div class="flex a-rate items-center">
    <div
      v-for="i of count"
      :key="i"
      :data-index="i"
      :style="{ padding: `4rpx ${gutter}rpx` }">
      <a-icon
        :color="modelValue >= i ? activeColor : inactiveColor"
        name="bi:star-fill" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    /**
     * 选择星星的数量
     */
    modelValue: number
    /**
     * 星星数量
     */
    count?: number
    /**
     * 是否只读
     */
    readonly?: boolean
    /**
     * 未选中星星的颜色
     */
    inactiveColor?: string
    /**
     * 选中星星的颜色
     */
    activeColor?: string
    /**
     * 星星之间的间距
     */
    gutter?: number
  }>(),
  {
    count: 5,
    readonly: false,
    inactiveColor: '#E5E5E5',
    activeColor: '#FFE371',
    gutter: 4,
  },
)
</script>

<style lang="scss"></style>
