<script setup lang="ts">
import { useBoxesStore } from '~/store/boxes'
import { useMinesStore } from '~/store/mines'
import type { Position } from '~/store/types'

const { positions, setup } = useBoxesStore()
const { positions: minesPosition } = useMinesStore()
const passed = computed(() => {
  return minesPosition.every(mine => positions.find(position => position.top === mine.top && position.left === mine.left))
})

const boxes = [
  {
    top: 1,
    left: 3,
  },
  {
    top: 3,
    left: 5,
  },
  {
    top: 5,
    left: 3,
  },
  {
    top: 3,
    left: 1,
  },
]

setup(boxes)

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
  <div v-for="(style, i) in styles" :key="i" absolute h5 w5 border border-coolgray :style="style" />
  <Confetti :passed="passed" />
</template>
