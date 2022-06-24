<template>
  <div class="a-button" @click="$emit('click')">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.a-button {
  @apply rounded bg-blue-500 mt-4 py-2 px-3 text-light-50 inline-block;
}
</style>
