<template>
  <div class="h-full">
    <Cover :data="movieDetail" :card="cardList" />

    <div class="bg-light-50 rounded-24px -mt-6 py-8 z-2 relative">
      <div class="px-6 pb-8">
        <div class="text-22px">简介</div>
        <div class="mt-4 text-13px text-gray-500 leading-5 indent">
          {{ movieDetail.overview }}
        </div>
      </div>

      <div class="text-0px">
        <image
          v-for="(backdrop, index) of images.backdrops"
          :key="index"
          class="w-full"
          :src="`${baseImageUrl}w1066_and_h600_bestv2${backdrop.file_path}`"
          mode="widthFix"
          lazy-load
          show-menu-by-longpress
          @click="onImageClick(backdrop.file_path, images.backdrops)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CardItem, ImageItem, MovieItem } from './types'
import Cover from './components/Cover.vue'
import { transformAmount } from '@/utils/transform'

const { baseImageUrl } = useMovieStore()

const movieId = ref('')
const movieDetail = ref<MovieItem>({ vote_average: 0 } as MovieItem)
const cardList = ref<CardItem[]>([])

function computedDuration(minute: number) {
  return `${~~(minute / 60)}h${minute % 60}m`
}

function onImageClick(currentUrl: string, list: ImageItem[]) {
  uni.previewImage({
    current: `${baseImageUrl}original${currentUrl}`,
    urls: list.map(item => `${baseImageUrl}original${item.file_path}`),
  })
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

const images = ref<Record<string, ImageItem[]>>({
  backdrops: [],
  posters: [],
})
async function reFindMovieImages() {
  const [err, data] = await requestMovieDB(`/movie/${movieId.value}/images`)
  if (!err) {
    images.value = data
  }
}

onLoad(({ id = '' }) => {
  if (id) {
    movieId.value = id
    reFindMovieDetail()
    reFindMovieImages()
  } else {
    uni.showToast({ title: '出错啦！', icon: 'none' })
    useRouter().go()
  }
})

onShareAppMessage(() => {
  const { title, poster_path } = movieDetail.value
  return {
    title: `我发现一部超级好看的电影 [${title}]，快来看看吧！`,
    imageUrl: `${baseImageUrl}w440_and_h660_face${poster_path}`,
  }
})
</script>

<style lang="scss" scoped></style>
