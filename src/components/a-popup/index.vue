<template>
  <div
    v-show="modelValue && mask"
    class="h-screen w-screen top-0 left-0 z-49 fixed"
    :style="{ 'background-color': maskColor }"
    @click="onCloseClick"></div>

  <a-transition
    :visible="modelValue"
    :mode="transitionMode"
    :custom-style="transitionStyle">
    <div
      class="h-full max-h-full w-full wxt-popup overflow-hidden"
      :style="popupStyle">
      <view
        v-if="touchBar"
        class="flex h-24px items-center justify-center"
        @click="onCloseClick"
        @touchmove="onBarTouchmove"
        @touchstart="onBarTouchStart">
        <view class="bg-hex-d3d8df rounded-2px h-4px w-36px"></view>
      </view>

      <scroll-view
        scroll-y
        class="h-full max-h-screen wxt-popup__content box-border"
        :style="{
          height: touchBar ? 'calc(100% - 48rpx)' : '100%',
        }">
        <div
          v-if="!hiddenClose"
          class="p-6px top-10px right-10px z-10 fixed"
          @click="onCloseClick">
          <i
            class="text-12px iconfont icon-close-icon"
            :style="{ color: closeColor }"></i>
        </div>

        <div
          class="h-full"
          :class="{ 'safe-area-inset-bottom': safeAreaInsetBottom }">
          <slot></slot>
        </div>
      </scroll-view>

      <div class="wxt-popup__close" @click="onCloseClick"></div>
    </div>
  </a-transition>
</template>

<script setup lang="ts">
import { transitionModes, transitionStyleByMode } from './popup'
import type { ModeItem } from './types'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    mode?: ModeItem
    /** 弹框高度 单位 px 默认 auto */
    height?: number | string
    /** 是否显示遮罩层 默认: true */
    mask?: boolean
    /** 遮罩层颜色 默认: rgba(0,0,0,0.3) */
    maskColor?: string
    /** 隐藏 关闭图标 默认: false */
    hiddenClose?: boolean
    /** 关闭颜色 默认: #000 */
    closeColor?: string
    /** ios 底部安全适配 默认 false */
    safeAreaInsetBottom?: boolean
    /** 设置圆角值 单位 px，仅对mode = top | bottom | center 有效 */
    round?: number | string
    /** 距离底部距离 默认 0 */
    bottom?: number | string
    /**
     * 背景色 默认: `#fff`
     */
    bgColor?: string
    touchBar?: boolean
  }>(),
  {
    mode: 'bottom',
    height: 'auto',
    mask: true,
    maskColor: 'rgba(0,0,0,0.3)',
    hiddenClose: false,
    closeColor: '#000',
    safeAreaInsetBottom: false,
    round: 0,
    bottom: 0,
    bgColor: '#fff',
    touchBar: false,
  },
)

const emits = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
  (event: 'close'): void
}>()

const { popupStyle } = usePopupStyle()
const { transitionStyle, transitionMode } = useTransitionOption()
const { onBarTouchmove, onBarTouchStart } = useBarTouch()

function usePopupStyle() {
  const modeBorderRadius = computed<
    Partial<Record<ModeItem, Record<string, string>>>
  >(() => {
    const { round } = props
    const roundSize = typeof round === 'string' ? round : `${round * 2}rpx`
    return {
      center: { 'border-radius': roundSize },
      top: {
        'border-bottom-right-radius': roundSize,
        'border-bottom-left-radius': roundSize,
      },
      bottom: {
        'border-top-right-radius': roundSize,
        'border-top-left-radius': roundSize,
      },
    }
  })

  const h = computed(() => {
    if (['left', 'right'].includes(props.mode)) return '100%'

    const height = props.height
    return typeof height === 'string' ? height : `${height * 2}rpx`
  })

  const bottom = computed(() => {
    const bottom = props.bottom
    const b = typeof bottom === 'string' ? bottom : `${bottom * 2}rpx`
    return props.mode === 'bottom' ? { bottom: b } : {}
  })

  const popupStyle = computed(() => ({
    ...modeBorderRadius.value[props.mode],
    'background-color': props.bgColor,
    height: h.value,
    ...bottom.value,
  }))

  return { popupStyle }
}

function useTransitionOption() {
  const transitionStyle = computed(() => ({
    position: 'fixed',
    'z-index': 50,
    ...transitionStyleByMode[props.mode],
  }))

  const transitionMode = computed(() => transitionModes[props.mode])

  return {
    transitionStyle,
    transitionMode,
  }
}

function onCloseClick() {
  emits('update:modelValue', false)
  emits('close')
}

function useBarTouch() {
  let touchStartY = 0

  function onBarTouchStart(e: TouchEvent) {
    const { pageY } = e.touches[0]
    touchStartY = pageY
  }

  function onBarTouchmove(e: TouchEvent) {
    const { pageY } = e.touches[0]
    pageY - touchStartY > 20 && onCloseClick()
  }

  return {
    onBarTouchmove,
    onBarTouchStart,
  }
}

onMounted(() => {})
</script>

<style lang="scss">
.wxt-popup {
  &--center {
    width: calc(100% - 32px);
  }
}
</style>
