<script setup lang="ts">
import { usePlayerStore } from '~/store/player'

const props = defineProps({
  isEdit: Boolean,
})

interface MOVE_OPERATIONS {
  ArrowLeft: () => void
  ArrowRight: () => void
  ArrowUp: () => void
  ArrowDown: () => void
}

const { position, moveLeft, moveRight, moveUp, moveDown } = usePlayerStore()
const style = getStyle(position)
const moveOperations: MOVE_OPERATIONS = {
  ArrowLeft: moveLeft,
  ArrowRight: moveRight,
  ArrowUp: moveUp,
  ArrowDown: moveDown,
}

function handleKeyDown({ key }: { key: string }) {
  if (props.isEdit)
    return
  if (Object.keys(moveOperations).includes(key))
    moveOperations[key as keyof MOVE_OPERATIONS]()
}

const cleanup = useEventListener(window, 'keydown', handleKeyDown)

onUnmounted(cleanup)
</script>

<template>
  <div pointer-events-none absolute h5 w5 :style="style">
    <img src="../assets/player.png">
  </div>
</template>
