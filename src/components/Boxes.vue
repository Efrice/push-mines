<script setup lang="ts">
import { useBoxesStore } from '~/store/boxes'

const { positions } = useBoxesStore()
const styles = getStyles(positions)
</script>

<template>
  <div v-for="(style, i) in styles" :key="i" absolute h5 w5 border border-coolgray :style="style" />
</template>
