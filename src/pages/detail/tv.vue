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

const movieId = ref('')
const movieDetail = ref<MovieItem>({ vote_average: 0 } as MovieItem)
const cardList = ref<CardItem[]>([])

async function reFindMovieDetail() {
  const [err, data] = await requestMovieDB(`/tv/${movieId.value}`)
  if (!err) {
    movieDetail.value = data
    const { first_air_date, last_air_date, seasons = [] } = data
    cardList.value = [
      { label: '首映', value: first_air_date },
      { label: '最后更新', value: last_air_date },
      { label: '当前季', value: seasons[seasons.length - 1]?.name },
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
