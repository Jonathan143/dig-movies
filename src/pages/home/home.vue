<template>
  <Container :active="0">
    <view class="home" @click="count++">home</view>

    {{ count }}
  </Container>
</template>

<script setup lang="ts">
import Container from './components/Container.vue'

const count = ref(0)
</script>

<style></style>
