// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'

// 手动引入 ECharts 各模块来减小打包体积

// 引入柱状图图表，图表后缀都为 Chart
import { BarChart, LineChart, PieChart } from 'echarts/charts'

// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features'

// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'

// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import {
  DataZoomComponent,
  GraphicComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components'

echarts.use([
  CanvasRenderer,
  BarChart,
  PieChart,
  LineChart,
  TitleComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  GraphicComponent,
  DataZoomComponent,
  LabelLayout,
  UniversalTransition,
])

export const aEcharts = echarts
