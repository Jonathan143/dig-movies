<template>
  <div class="h-full">
    <Cover :data="movieDetail" />

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
import type { MovieItem } from './types'
import Cover from './components/Cover.vue'

const movieId = ref('')
const movieDetail = ref<MovieItem>({ vote_average: 0 } as MovieItem)

async function reFindMovieDetail() {
  const [err, data] = await request({
    url: 'post/movie_db',
    method: 'POST',
    data: {
      api: `/movie/${movieId.value}`,
    },
  })
  if (!err) {
    movieDetail.value = data
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
