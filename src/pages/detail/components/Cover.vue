<template>
  <div
    class="bg-cover bg-no-repeat h-4/5 w-full text-light-50"
    :style="bgStyle">
    <div
      class="flex flex-col h-full bg-dark-900 bg-opacity-20 w-full pt-30 backdrop-filter items-center backdrop-blur-5">
      <div
        class="border-solid border-9px border-opacity-8 border-light-50 rounded-22px h-65 text-0 w-51 box-content">
        <image
          v-if="data.poster_path"
          class="h-full rounded-22px w-full"
          :src="`${baseImageUrl}w440_and_h660_face${data.poster_path}`" />
      </div>

      <div class="mt-8 px-6 text-22px">{{ data.title || data.name }}</div>
      <div class="flex mt-3 opacity-80 text-13px item-center">
        <div
          v-for="genre of data.genres"
          :key="genre.id"
          class="flex items-center">
          <div>{{ genre.name }}</div>
          <div class="bg-current rounded-1/2 h-5px mx-1.5 w-5px"></div>
        </div>

        <div class="flex items-center">
          <a-icon name="bi:star-fill" size="24rpx" />
          <div class="ml-1">{{ data.vote_average.toFixed(1) }}</div>
        </div>
      </div>

      <div
        class="flex bg-light-50 bg-opacity-11 rounded-11px mt-8 text-center py-6 text-14px w-4/5 items-center backdrop-blur backdrop-filter">
        <div class="flex-1">
          <div class="mb-2 opacity-80 text-12px">时长</div>
          <div>{{ computedDuration(data.runtime) }}</div>
        </div>
        <div class="flex-1">
          <div class="mb-2 opacity-80 text-12px">上映时间</div>
          <div>{{ data.release_date }}</div>
        </div>
        <div class="flex-1">
          <div class="mb-2 opacity-80 text-12px">票房</div>
          <div>{{ transformAmount(data.revenue || 0) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MovieItem } from '../types'
import { transformAmount } from '@/utils/transform'

const props = defineProps<{
  data: MovieItem
}>()

const { baseImageUrl } = useMovieStore()

const bgStyle = computed(() => {
  const { backdrop_path } = props.data
  return backdrop_path
    ? {
        backgroundImage: `url(${baseImageUrl}w440_and_h660_face${backdrop_path})`,
      }
    : ''
})

function computedDuration(minute: number) {
  return `${~~(minute / 60)}h${minute % 60}m`
}
</script>

<style lang="scss" scoped></style>
