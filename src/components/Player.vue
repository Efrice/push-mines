<script setup lang="ts">
import { usePlayerStore } from '~/store/player'
import { Step } from '~/store/types'

interface MOVE_OPERATIONS {
  ArrowLeft: () => void
  ArrowRight: () => void
  ArrowUp: () => void
  ArrowDown: () => void
}

interface OPERATIONS_TO_STEP {
  ArrowUp: Step.up
  ArrowDown: Step.down
  ArrowRight: Step.right
  ArrowLeft: Step.left
}

const { position, pushStep, moveLeft, moveRight, moveUp, moveDown } = usePlayerStore()
const style = getStyle(position)
const moveOperations: MOVE_OPERATIONS = {
  ArrowLeft: moveLeft,
  ArrowRight: moveRight,
  ArrowUp: moveUp,
  ArrowDown: moveDown,
}
const operationToStep: OPERATIONS_TO_STEP = {
  ArrowUp: Step.up,
  ArrowDown: Step.down,
  ArrowRight: Step.right,
  ArrowLeft: Step.left,
}
window.addEventListener('keydown', ({ key }) => {
  if (Object.keys(moveOperations).includes(key)) {
    pushStep(operationToStep[key as keyof OPERATIONS_TO_STEP])
    moveOperations[key as keyof MOVE_OPERATIONS]()
  }
})
</script>

<template>
  <div i-carbon:user absolute h5 w5 :style="style" />
</template>
