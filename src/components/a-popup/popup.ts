import type { AnimationMode } from '../a-transition/types';

export const transitionStyleByMode = {
  left: { left: 0, top: 0, height: '100%' },
  top: { left: 0, top: 0, width: '100%' },
  right: { right: 0, top: 0, height: '100%' },
  bottom: { left: 0, bottom: 0, width: '100%' },
  center: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
}

export const transitionModes: Record<string, AnimationMode> = {
  left: 'slide-left',
  top: 'slide-down',
  right: 'slide-right',
  bottom: 'slide-up',
  center: 'fade-zoom',
}
