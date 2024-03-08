<script setup lang="ts">
import { usePlayerStore } from '~/store/player'

interface MOVE_OPERATIONS {
  ArrowLeft: () => void
  ArrowRight: () => void
  ArrowUp: () => void
  ArrowDown: () => void
}

const { position, moveLeft, moveRight, moveUp, moveDown } = usePlayerStore()

const cellLen = 20
const style = computed(() => {
  return {
    top: `${position.top * cellLen}px`,
    left: `${position.left * cellLen}px`,
  }
})

const moveOperations: MOVE_OPERATIONS = {
  ArrowLeft: moveLeft,
  ArrowRight: moveRight,
  ArrowUp: moveUp,
  ArrowDown: moveDown,
}
window.addEventListener('keydown', ({ key }) => {
  if (Object.keys(moveOperations).includes(key))
    moveOperations[key as keyof MOVE_OPERATIONS]()
})
</script>

<template>
  <div i-carbon:user absolute h5 w5 :style="style" />
</template>
