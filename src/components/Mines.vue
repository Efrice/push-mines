<script setup lang="ts">
import { useMinesStore } from '~/store/mines'

const { positions } = useMinesStore()
const styles = getStyles(positions)
</script>

<template>
  <div v-for="(style, i) in styles" :key="i" absolute h5 w5 :style="style">
    <img src="../assets/mines.png">
  </div>
</template>
