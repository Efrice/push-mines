<script setup lang="ts">
import { useBoxesStore } from '~/store/boxes'

const { positions } = useBoxesStore()
const styles = getStyles(positions)
</script>

<template>
  <div
    v-for="(style, i) in styles"
    :key="i"
    :style="style"
    absolute h5 w5
    border border-gray-200 rounded dark:border-gray-500
  />
</template>
