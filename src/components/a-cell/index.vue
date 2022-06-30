<template>
  <div
    class="flex bg-light-50 py-3 px-4 a-cell items-center justify-between"
    :class="{ 'active:bg-gray-100': isLink }">
    <div class="flex flex-1 items-center">
      <div class="mr-1.5">
        <slot name="leftIcon">
          <a-icon v-if="leftIcon" :name="leftIcon" />
        </slot>
      </div>

      <slot name="label">{{ label }}</slot>
    </div>

    <div
      class="flex flex-1 ml-2 text-gray-400 items-center justify-end"
      @click="emit('click')">
      <slot>{{ value }}</slot>

      <div class="ml-1.5">
        <slot name="rightIcon">
          <a-icon v-if="rightIcon" :name="rightIcon" />
          <a-icon v-else-if="isLink" name="icon-park:right" />
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string
    value?: string | number
    leftIcon?: string
    rightIcon?: string
    /**
     * 是否展示右侧箭头并开启点击反馈
     *
     * 默认 `false`
     */
    isLink?: boolean
  }>(),
  {
    label: '',
    value: '',
    leftIcon: '',
    rightIcon: '',
    isLink: false,
  },
)

const emit = defineEmits<{
  (event: 'click'): void
}>()
</script>

<style lang="scss"></style>
