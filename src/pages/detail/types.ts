import type { MovieInfo } from '../home/types'

export interface CardItem {
  label: string
  value: string | number
}

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

export interface ImageItem {
  file_path: string
  width: number
  height: number
}
