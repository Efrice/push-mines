import { defineStore } from 'pinia'

interface Position {
  top: number
  left: number
}

export const usePlayerStore = defineStore('player', () => {
  const position = ref<Position>({
    top: 0,
    left: 0,
  })

  function setup(newPos: Position) {
    Object.assign(position.value, newPos)
  }

  function moveLeft() {
    position.value.left -= 1
  }

  function moveRight() {
    position.value.left += 1
  }

  function moveUp() {
    position.value.top -= 1
  }

  function moveDown() {
    position.value.top += 1
  }

  return {
    position,
    setup,
    moveLeft,
    moveRight,
    moveUp,
    moveDown,
  }
})
