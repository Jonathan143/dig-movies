<template>
  <Container :active="1">
    <view @click="count++">like</view>

    {{ count }}
  </Container>
</template>

<script setup lang="ts">
import Container from './components/Container.vue'

const count = ref(0)
</script>

<style></style>
