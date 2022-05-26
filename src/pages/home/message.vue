<template>
  <Container :active="2">
    <view @click="count++">message</view>

    {{ count }}
  </Container>
</template>

<script setup lang="ts">
import Container from './components/Container.vue'

const count = ref(0)
</script>

<style></style>
