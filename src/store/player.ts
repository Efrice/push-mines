import { defineStore } from 'pinia'
import { useMapStore } from './map'

interface Position {
  top: number
  left: number
}

export const usePlayerStore = defineStore('player', () => {
  const { isGrid } = useMapStore()

  const position = ref<Position>({
    top: 2,
    left: 2,
  })

  function setup(newPos: Position) {
    Object.assign(position.value, newPos)
  }

  function moveLeft() {
    if (isGrid(position.value.left - 1, position.value.top))
      return
    position.value.left -= 1
  }

  function moveRight() {
    if (isGrid(position.value.left + 1, position.value.top))
      return
    position.value.left += 1
  }

  function moveUp() {
    if (isGrid(position.value.left, position.value.top - 1))
      return
    position.value.top -= 1
  }

  function moveDown() {
    if (isGrid(position.value.left, position.value.top + 1))
      return
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
