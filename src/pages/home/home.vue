<template>
  <Container :active="0">
    <div class="home">
      <div class="flex p-6 text-24px items-center">
        <div>趋势</div>
        <div class="px-3 w-34">
          <a-tabs
            v-model="activeTab"
            :list="tabList"
            :disabled="isLoading"
            @change="onTabChange" />
        </div>
        <a-icon
          v-show="isLoading"
          color="#2588ff"
          name="line-md:loading-twotone-loop" />
      </div>
      <scroll-view scroll-x>
        <div class="flex min-h-75 px-6">
          <div
            v-for="media of mediaList"
            :key="media.id"
            class="mr-6"
            @click="goMovieDetailPage(media)">
            <div class="text-0 relative">
              <image
                class="rounded-22px h-65 w-50"
                :src="`https://image.tmdb.org/t/p/w440_and_h660_face/${media.poster_path}`"
                lazy-load />

              <div
                class="flex bg-light-50 bg-opacity-19 rounded-16px py-1 px-3 top-4 left-4 text-light-50 absolute items-center backdrop-filter backdrop-blur-20">
                <a-icon name="bi:star-fill" />
                <text class="ml-1.5 text-14px">
                  {{ media.vote_average.toFixed(1) }}
                </text>
              </div>
            </div>

            <div class="mt-2">{{ media.name || media.title }}</div>
          </div>
        </div>
      </scroll-view>

      <div class="p-6 text-24px">即将上映</div>
      <scroll-view scroll-x>
        <div class="flex px-6">
          <div
            v-for="media of upcoming"
            :key="media.id"
            class="mr-6"
            @click="goMovieDetailPage(media)">
            <div class="text-0 relative">
              <image
                class="rounded-22px h-65 w-50"
                :src="`https://image.tmdb.org/t/p/w440_and_h660_face/${media.poster_path}`"
                lazy-load />

              <div
                class="flex bg-light-50 bg-opacity-19 rounded-16px py-1 px-3 top-4 left-4 text-light-50 absolute items-center backdrop-filter backdrop-blur-20">
                <a-icon name="bi:star-fill" />
                <text class="ml-1.5 text-14px">
                  {{ media.vote_average.toFixed(1) }}
                </text>
              </div>
            </div>

            <div class="mt-2">{{ media.name || media.title }}</div>
            <div class="mt-1 text-gray-500 text-12px">
              {{ media.release_date }}
            </div>
          </div>
        </div>
      </scroll-view>

      <div class="h-30"></div>
    </div>
  </Container>
</template>

<script setup lang="ts">
import Container from './components/Container.vue'
import type { MediaType, MovieInfo, TimeWindow } from './types'

const router = useRouter()
const { isLoading, toggleLoading } = useLoading()
const mediaType = ref<MediaType>('all')
const timeWindow = ref<TimeWindow>('day')
const mediaList = ref<MovieInfo[]>([])
const upcoming = ref<MovieInfo[]>([])

const activeTab = ref(0)
const tabList = [
  { name: '今日', key: 'day' },
  { name: '本周', key: 'week' },
]

function onTabChange({ key = 'day' }, index: number) {
  timeWindow.value = key as TimeWindow
  reFindTrending()
}

function goMovieDetailPage({ id, media_type = 'movie' }: MovieInfo) {
  console.log(`/pages/detail/${media_type}`)

  router.push({ url: `/pages/detail/${media_type}`, params: { id: `${id}` } })
}

async function reFindTrending() {
  if (isLoading.value) return

  toggleLoading()
  const [err, data] = await requestMovieDB(
    `/trending/${mediaType.value}/${timeWindow.value}`,
  )
  if (err) {
    console.log(err)
  } else {
    const { results } = data
    mediaList.value = results
  }

  toggleLoading()
}

/** 即将上映 */
async function reFindUpcoming() {
  const [err, data] = await requestMovieDB(`/movie/upcoming`, { page: 1 })
  if (err) {
    console.log(err)
  } else {
    const { results } = data
    upcoming.value = results
  }
}

onLoad(() => {
  reFindTrending()
  reFindUpcoming()
})
</script>

<style lang="scss" scoped></style>
