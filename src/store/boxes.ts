import { defineStore } from 'pinia'
import type { Position } from './types'

export const useBoxesStore = defineStore('boxes', () => {
  const positions = reactive<Position[]>([])

  function setup(newPos: Position[]) {
    positions.splice(0, positions.length, ...newPos)
  }

  return {
    positions,
    setup,
  }
})
