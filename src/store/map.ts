import { defineStore } from 'pinia'

export enum CellType {
  NORMAL,
  GRID,
}

type Map = CellType[][]

export const useMapStore = defineStore('map', () => {
  const map = ref<Map>([
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ])

  function setup(newMap: Map) {
    map.value.splice(0, map.value.length, ...newMap)
  }

  const isGrid = (x: number, y: number) => map.value[x][y] === CellType.GRID

  return {
    map,
    setup,
    isGrid,
  }
})
