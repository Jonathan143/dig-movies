<template>
  <div
    class="border-b border-solid flex border-0 border-hex-dee2ee py-6"
    @click="$emit('click', data)">
    <div class="flex-shrink-0 text-0">
      <image
        class="rounded-13px h-36 w-29"
        :src="`${movieStore.baseImageUrl}/w440_and_h660_face/${data.poster_path}`" />
    </div>

    <div class="flex-1 pl-5">
      <div class="font-500 text-dark-500 text-16px leading-6">
        {{ data.title || data.name }}
      </div>

      <!-- 评分 -->
      <div class="flex mt-2 text-12px items-center">
        <a-rate :model-value="Math.round(data.vote_average / 2)" />
        <div class="ml-2 text-gray-500">
          {{ data.vote_average }}
        </div>
      </div>

      <!-- 类别 -->
      <div class="flex flex-wrap mt-2 items-center">
        <div
          v-for="genre of data.genre_ids"
          :key="genre"
          class="border-solid border rounded border-gray-200 mr-1 mb-1 py-1.5 px-3 text-gray-700 text-10px">
          {{ movieStore.genres[genre] }}
        </div>
      </div>

      <!-- 简介 -->
      <div
        class="mt-2 text-gray-700 text-12px text-truncate-3 leading-4 indent">
        {{ data.overview }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MovieInfo } from '../types'

defineProps<{
  data: MovieInfo
}>()

const movieStore = useMovieStore()
</script>

<style lang="scss" scoped></style>
