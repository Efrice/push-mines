import { defineStore } from 'pinia'

export enum CellType {
  NORMAL,
  GRID,
}

type Map = CellType[][]

export const useMapStore = defineStore('map', () => {
  const map = ref<Map>([])

  const setupMap = (newMap: Map) => map.value.splice(0, map.value.length, ...newMap)

  const isGrid = (x: number, y: number) => map.value[x][y] === CellType.GRID

  return {
    map,
    setupMap,
    isGrid,
  }
})
