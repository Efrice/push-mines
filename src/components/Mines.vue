<script setup lang="ts">
import { useMinesStore } from '~/store/mines'
import type { Position } from '~/store/types'

const { positions, setup } = useMinesStore()
const mine = [
  {
    top: 3,
    left: 2,
  },
  {
    top: 3,
    left: 4,
  },
  {
    top: 2,
    left: 3,
  },
  {
    top: 4,
    left: 3,
  },
]

const mines = [
  {
    top: 3,
    left: 1,
  },
  {
    top: 3,
    left: 2,
  },
  {
    top: 3,
    left: 4,
  },
  {
    top: 3,
    left: 5,
  },
  {
    top: 1,
    left: 3,
  },
  {
    top: 2,
    left: 3,
  },
  {
    top: 4,
    left: 3,
  },
  {
    top: 5,
    left: 3,
  },
]

setup(mine)

const cellLen = 20
const styles = computed(() => {
  return positions.map((position: Position) => {
    return {
      top: `${position.top * cellLen}px`,
      left: `${position.left * cellLen}px`,
    }
  })
})
</script>

<template>
  <div v-for="(style, i) in styles" :key="i" i-arcticons:minesweeper absolute h5 w5 :style="style" />
</template>
