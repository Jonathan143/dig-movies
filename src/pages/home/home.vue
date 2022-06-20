<template>
  <Container :active="0">
    <view class="home" @click="count++">home</view>

    {{ count }}

    <div class="p-2" @click="onClick">go login</div>
  </Container>
</template>

<script setup lang="ts">
import Container from './components/Container.vue'

const router = useRouter()

const count = ref(0)

function onClick() {
  router.push('/pages/login/index')
}
</script>

<style></style>
