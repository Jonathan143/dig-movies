export interface MovieInfo {
  /** 标题 */
  title: string
  /** 原标题 */
  original_title: string
  /** 简介 */
  overview: string
  /** 海报 */
  backdrop_path: string
  /** 封面图 */
  poster_path: string
  id: number
  genre_ids: number[]
  /** 人气值 */
  popularity: number
  /** 上映时间 */
  release_date: string
  /** 评分 */
  vote_average: number
  /** 评分数 */
  vote_count: number
}
