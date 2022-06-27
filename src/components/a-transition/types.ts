/**
 * fade 淡入
 *
 * fade-up 上滑淡入
 *
 * fade-down 下滑淡入
 *
 * fade-left 左滑淡入
 *
 * fade-right 右滑淡入
 *
 * slide-up 上滑进入
 *
 * slide-down 下滑进入
 *
 * slide-left 左滑进入
 *
 * slide-right 右滑进入
 *
 * zoom-in 缩放
 *
 * zoom-out 缩放
 */
export type AnimationMode =
  | 'fade'
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'zoom-in'
  | 'zoom-out'

export interface TransitionProps {
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
}
