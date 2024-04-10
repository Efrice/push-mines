import { defineStore } from 'pinia'
import { CellType } from './types'
import type { MapType, Position } from './types'

export const useMapStore = defineStore('map', () => {
  const map = reactive<MapType>([])

  function setup(newMap: MapType) {
    map.splice(0, map.length, ...newMap)
  }

  const isWall = ({ top: y, left: x }: Position) => map[y][x] === CellType.WALL

  return {
    map,
    setup,
    isWall,
  }
})
