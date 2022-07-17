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
          <div class="mx-6">
            <MovieItem
              v-for="movieItem of movieList"
              :key="movieItem.id"
              :type="activeType"
              :data="movieItem"
              @click="onMovieItemClick" />
          </div>

          <div v-if="isEmpty" class="flex pt-20 justify-center">
            <image
              class="h-56 w-60"
              :src="`../../static/img/${
                isLoadError ? 'not_found' : 'void'
              }.svg`"
              @click="loadMore" />
          </div>

          <div
            class="flex py-3 text-13px text-gray-700 items-center justify-center">
            <a-icon
              v-show="isLoading"
              class="mr-1"
              name="line-md:loading-twotone-loop" />
            <span v-if="isLoadError" @click="loadMore">点击重新加载</span>
            <span v-else>{{ noMore ? '没有更多了' : '加载中...' }}</span>
          </div>

          <div class="h-30"></div>
        </scroll-view>
      </div>
    </div>
  </Container>
</template>

<script setup lang="ts">
import Container from './components/Container.vue'
import type { LikeMediaType, MovieInfo } from './types'
import MovieItem from './components/MovieItem.vue'

const router = useRouter()
const { isLoading, toggleLoading } = useLoading()
const isLoadError = ref(false)
const noMore = ref(false)
const activeType = ref<LikeMediaType>('movie')
const typeList: { name: string; type: LikeMediaType }[] = [
  { name: '电影', type: 'movie' },
  { name: '剧集', type: 'tv' },
]

const movieList = ref<MovieInfo[]>([])
const page = ref({
  index: 1,
  total: 0,
})

const isEmpty = computed(() => !movieList.value.length)

function onTabItemClick(type: LikeMediaType) {
  activeType.value = type
  page.value.index = 1
  movieList.value = []
  loadMore()
}

function onMovieItemClick(data: MovieInfo) {
  router.push({ url: '/pages/detail/movie', params: { id: `${data.id}` } })
}

async function loadMore() {
  if (isLoading.value) return

  isLoadError.value = false
  toggleLoading()
  const { index } = page.value
  const [err, data] = await requestMovieDB(`/${activeType.value}/popular`, {
    page: index,
  })
  if (!err) {
    const { results, total_results, total_pages } = data
    movieList.value = movieList.value.concat(results)
    page.value = { index: index + 1, total: total_results }
    noMore.value = index === total_pages
  } else {
    isLoadError.value = true
  }
  toggleLoading()
}

onLoad(() => {
  loadMore()
})

onShareAppMessage(() => ({
  title: '',
  imageUrl: 'https://yun.yang143.cn/dig-movies/undraw_netflix.png',
}))
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
