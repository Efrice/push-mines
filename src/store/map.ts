import { defineStore } from 'pinia'
import type { Position } from './types'

export enum CellType {
  NORMAL,
  GRID,
}

type Map = CellType[][]

export const useMapStore = defineStore('map', () => {
  const map = reactive<Map>([
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ])

  function setup(newMap: Map) {
    map.splice(0, map.length, ...newMap)
  }

  const isGrid = ({ top: y, left: x }: Position) => map[x][y] === CellType.GRID

  return {
    map,
    setup,
    isGrid,
  }
})
