import { CellType } from './types'
import type { MapType, Position } from './types'

const map = reactive<MapType>([])

export function useMapStore() {
  function setup(newMap: MapType) {
    map.splice(0, map.length, ...newMap)
  }

  const isWall = ({ top: y, left: x }: Position) => {
    return map[y][x] === CellType.WALL
  }

  return {
    map,
    setup,
    isWall,
  }
}
