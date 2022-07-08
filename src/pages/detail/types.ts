import type { MovieInfo } from '../home/types'

export interface GenreItem {
  name: string
  id: number
}

export interface MovieItem extends MovieInfo {
  genres: GenreItem[]
  vote_average: number
  runtime: number
  revenue: number
}
