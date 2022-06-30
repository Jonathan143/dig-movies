import { acceptHMRUpdate, defineStore } from 'pinia'
import type { MovieState } from './types'

export const useMovieStore = defineStore('movie', {
  state: (): MovieState => ({
    genres: {
      '12': '冒险',
      '14': '奇幻',
      '16': '动画',
      '18': '剧情',
      '27': '恐怖',
      '28': '动作',
      '35': '喜剧',
      '36': '历史',
      '37': '西部',
      '53': '惊悚',
      '80': '犯罪',
      '99': '纪录',
      '878': '科幻',
      '9648': '悬疑',
      '10402': '音乐',
      '10749': '爱情',
      '10751': '家庭',
      '10752': '战争',
      '10759': '动作冒险',
      '10762': '儿童',
      '10763': '新闻',
      '10764': '真人秀',
      '10765': 'Sci-Fi & Fantasy',
      '10766': '肥皂剧',
      '10767': '脱口秀',
      '10768': 'War & Politics',
      '10770': '电视电影',
    },
  }),

  getters: {},

  actions: {},
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMovieStore, import.meta.hot))
