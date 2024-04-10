import { defineStore } from 'pinia'
import type { Position } from './types'
import { isSamePosition } from '~/utils'

export const useBoxesStore = defineStore('boxes', () => {
  const positions = reactive<Position[]>([])

  function setup(newPos: Position[]) {
    positions.splice(0, positions.length, ...newPos)
  }

  function remove(position: Position) {
    const index = positions.findIndex(p => isSamePosition(p, position))
    if (index > -1)
      positions.splice(index, 1)
  }

  return {
    positions,
    setup,
    remove,
  }
})
