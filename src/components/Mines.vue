<script setup lang="ts">
import { useMinesStore } from '~/store/mines'

const { positions } = useMinesStore()
const styles = getStyles(positions)
</script>

<template>
  <div v-for="(style, i) in styles" :key="i" i-arcticons:minesweeper absolute h5 w5 :style="style" />
</template>
