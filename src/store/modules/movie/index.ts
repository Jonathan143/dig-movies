import { acceptHMRUpdate, defineStore } from 'pinia'
import type { MovieState } from './types';

export const useMovieStore = defineStore('movie', {
  state: (): MovieState => ({
    genres: {
      '12': '冒险',
      '14': '魔幻',
      '16': '动画',
      '18': '戏剧',
      '27': '恐怖',
      '28': '动作',
      '35': '喜剧',
      '36': '历史',
      '37': '欧美',
      '53': '惊悚',
      '80': '犯罪',
      '99': '纪录',
      '878': '科幻小说',
      '9648': '推理',
      '10402': '音乐',
      '10749': '爱情',
      '10751': '家庭',
      '10752': '战争',
      '10759': '动作 & 冒险',
      '10762': 'Kids',
      '10763': '新闻',
      '10764': '现实',
      '10765': '科幻 & 魔幻',
      '10766': '肥皂剧',
      '10767': 'Talk',
      '10768': '战争 & 政治',
      '10770': 'TV Movie',
    },
  }),

  getters: {},

  actions: {},
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMovieStore, import.meta.hot))
