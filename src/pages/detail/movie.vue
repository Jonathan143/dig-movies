<template>
  <div class="h-full">
    <Cover :data="movieDetail" :card="cardList" />

    <div class="bg-light-50 rounded-24px -mt-6 py-8 px-6 z-2 relative">
      <div>
        <div class="text-22px">简介</div>
        <div class="mt-4 text-13px text-gray-500 leading-5 indent">
          {{ movieDetail.overview }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CardItem, MovieItem } from './types'
import Cover from './components/Cover.vue'
import { transformAmount } from '@/utils/transform'

const movieId = ref('')
const movieDetail = ref<MovieItem>({ vote_average: 0 } as MovieItem)
const cardList = ref<CardItem[]>([])

function computedDuration(minute: number) {
  return `${~~(minute / 60)}h${minute % 60}m`
}

async function reFindMovieDetail() {
  const [err, data] = await requestMovieDB(`/movie/${movieId.value}`)
  if (!err) {
    movieDetail.value = data
    cardList.value = [
      { label: '时长', value: computedDuration(data.runtime) },
      { label: '上映时间', value: data.release_date },
      {
        label: '票房',
        value: data.revenue ? transformAmount(data.revenue) : '暂无数据',
      },
    ]
  }
}

onLoad(({ id = '' }) => {
  if (id) {
    movieId.value = id
    reFindMovieDetail()
  }
})
</script>

<style lang="scss" scoped></style>
