<template>
  <Container :active="1">
    <div class="flex-col flex h-full">
      <div class="flex-shrink-0 px-7 pb-6">
        <div class="font-500 pt-18 pb-10 text-23px">Favourite</div>

        <div class="flex">
          <div
            v-for="typeItem of typeList"
            :key="typeItem.type"
            class="rounded-6px mr-3.5 py-2.5 px-3.5 transition-shadow text-12 tab-item"
            :class="{ 'tab-item--active': activeType === typeItem.type }"
            @click="onTabItemClick(typeItem.type)">
            {{ typeItem.name }}
          </div>
        </div>
      </div>

      <div class="flex-1 overflow-hidden">
        <scroll-view
          scroll-y
          class="h-full bg-light-50"
          @scrolltolower="loadMore">
          <div class="px-6">
            <div
              v-for="movieItem of movieList"
              :key="movieItem.id"
              class="flex py-6">
              <div class="flex-shrink-0 text-0">
                <image
                  class="rounded-13px h-36 w-29"
                  :src="`https://image.tmdb.org/t/p/w200/${movieItem.poster_path}`" />
              </div>

              <div class="flex-1 pl-5">
                <div class="font-500 text-dark-500 text-16px leading-6">
                  {{ movieItem.title }}
                </div>

                <div
                  class="mt-2 text-gray-700 text-12px text-truncate-3 leading-4 indent">
                  {{ movieItem.overview }}
                </div>

                <div class="flex flex-wrap mt-2 items-center">
                  <div
                    v-for="genre of movieItem.genre_ids"
                    :key="genre"
                    class="border-solid border rounded border-gray-200 mr-1 mb-1 py-1.5 px-3 text-gray-700 text-10px">
                    {{ movieStore.genres[genre] }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex py-3 items-center justify-center">
            <a-icon name="line-md:loading-twotone-loop" />
            <span class="ml-1">加载中...</span>
          </div>

          <div class="h-30"></div>
        </scroll-view>
      </div>
    </div>
  </Container>
</template>

<script setup lang="ts">
import Container from './components/Container.vue'
import type { MovieInfo } from './types'

const movieStore = useMovieStore()
const { isLoading, toggleLoading } = useLoading()
const activeType = ref('movie')
const typeList = [
  { name: '电影', type: 'movie' },
  { name: '剧集', type: 'tv' },
]

const movieList = ref<MovieInfo[]>([])
const page = ref({
  index: 1,
  total: 0,
})

function onTabItemClick(type: string) {
  activeType.value = type
}

async function loadMore() {
  toggleLoading()
  const { index } = page.value
  const [err, data] = await request({
    url: 'post/movie_db',
    method: 'POST',
    data: {
      api: `/${activeType.value}/popular`,
      params: {
        page: index,
      },
    },
  })
  if (!err) {
    const { results, total_results } = data
    movieList.value = movieList.value.concat(results)
    page.value = { index: index + 1, total: total_results }
  }
  toggleLoading()
}

onLoad(() => {
  loadMore()
})
</script>

<style lang="scss" scoped>
.tab-item {
  box-shadow: 0px 22px 24px rgba(53, 64, 90, 0.13);
  &--active {
    @apply text-light-50;
    background: rgba(53, 68, 196, 1);
    box-shadow: 10px 32px 34px rgba(53, 68, 196, 0.3);
  }
}
</style>
