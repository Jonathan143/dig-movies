<template>
  <view class="a-icon" :style="style" @click="$emit('click')"></view>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name: string
    /** 是否为多色图标 */
    multicolor?: boolean
    color?: string
    size?: string
  }>(),
  {
    color: 'currentColor',
    multicolor: false,
    size: 'unset',
  },
)

const style = computed(() => {
  const name = props.name
  const url = name.startsWith('http')
    ? name
    : `https://api.iconify.design/${name}.svg`
  const baseStyle = { color: props.color, 'font-size': props.size }

  return props.multicolor
    ? {
        ...baseStyle,
        background: `url(${url}) no-repeat`,
        'background-size': '100% 100%',
        'background-color': 'transparent',
      }
    : {
        ...baseStyle,
        mask: `url(${url}) 0% 0% / 100% 100% no-repeat`,
        '-webkit-mask': `url(${url}) 0% 0% / 100% 100% no-repeat`,
        'background-color': 'currentColor',
      }
})
</script>

<style>
.a-icon {
  @apply h-1em w-1em inline-block;
  vertical-align: -2px;
}
</style>
