<template>
  <view
    v-if="isInit"
    ref="a-transition"
    class="a-transition"
    :class="classes"
    :style="mergeStyle"
    @tap="$emit('click')"
    @touchmove="noop">
    <slot />
  </view>
</template>

<script setup lang="ts">
import type { AnimationMode } from './types'

const props = withDefaults(
  defineProps<{
    visible?: boolean
    /**
     * 使用的动画模式
     *
     * default `fade`
     */
    mode?: AnimationMode
    /**
     * 动画的执行时间，单位ms
     *
     * default `300`
     */
    duration?: number
    /**
     * 使用的动画过渡函数
     *
     * default `ease-out`
     */
    timingFunction?: string
    /**
     * 自定义样式
     */
    customStyle?: Record<string, string | number>
  }>(),
  {
    visible: false,
    mode: 'fade',
    duration: 300,
    timingFunction: 'ease-out',
    customStyle: () => ({}),
  },
)

const emit = defineEmits<{
  (event: 'click'): void
  (event: 'beforeLeave'): void
  (event: 'leave'): void
  (event: 'afterLeave'): void
  (event: 'beforeEnter'): void
  (event: 'enter'): void
  (event: 'afterEnter'): void
}>()

const isInit = ref(false)

const mergeStyle = computed(() => ({
  'transition-duration': `${props.duration / 1000}s`,
  'transition-timing-function': props.timingFunction,
  ...props.customStyle,
}))
const classes = ref('')

const { vueEnter, vueLeave } = useAnimation()

watch(
  () => props.visible,
  val => {
    val ? vueEnter() : vueLeave()
  },
  {
    immediate: true,
  },
)

function noop(e: TouchEvent) {
  e.stopPropagation()
}

function useAnimation() {
  let transitionEnded = false
  const display = ref(false)
  let status = '' // 记录组件动画的状态

  /**
   * 定义类名，通过给元素动态切换类名，赋予元素一定的css动画样式
   * @param {AnimationMode} name 动画名
   */
  const getClassNames = (name: string) => ({
    enter: `a-${name}-enter a-${name}-enter-active`,
    'enter-to': `a-${name}-enter-to a-${name}-enter-active`,
    leave: `a-${name}-leave a-${name}-leave-active`,
    'leave-to': `a-${name}-leave-to a-${name}-leave-active`,
  })

  function vueEnter() {
    // 动画进入时的类名
    const classNames = getClassNames(props.mode)
    // 定义状态和发出动画进入前事件
    status = 'enter'
    emit('beforeEnter')
    display.value = true
    classes.value = classNames.enter
    isInit.value = true
    nextTick(async () => {
      // 标识动画尚未结束
      await new Promise<void>(resolve => {
        setTimeout(() => {
          resolve()
        }, 20)
      })
      emit('enter')
      transitionEnded = false
      // 组件动画进入后触发的事件
      emit('afterEnter')
      // 赋予组件enter-to类名
      classes.value = classNames['enter-to']
    })
  }

  function vueLeave() {
    // 如果不是展示状态，无需执行逻辑
    if (!display) return
    const classNames = getClassNames(props.mode)
    // 标记离开状态和发出事件
    status = 'leave'
    emit('beforeLeave')
    // 获得类名
    classes.value = classNames.leave

    nextTick(() => {
      // 动画正在离场的状态
      transitionEnded = false
      emit('leave')
      // 组件执行动画，到了执行的执行时间后，执行一些额外处理
      setTimeout(onTransitionEnd, props.duration)
      classes.value = classNames['leave-to']
    })
  }

  // 完成过渡后触发
  function onTransitionEnd() {
    // 如果已经是结束的状态，无需再处理
    if (transitionEnded) return
    transitionEnded = true
    // 发出组件动画执行后的事件
    status = ''
    status === 'leave' ? emit('afterLeave') : emit('afterEnter')
    if (!props.visible && display.value) {
      display.value = false
      isInit.value = false
    }
  }

  return {
    vueEnter,
    vueLeave,
  }
}
</script>

<style lang="scss">
@import './animation.scss';
</style>
