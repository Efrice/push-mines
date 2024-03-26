import { defineStore } from 'pinia'
import { useMapStore } from './map'
import { usePlayerStore } from './player'
import { useMinesStore } from './mines'
import { CellType } from './types'
import type { ElementType, Position } from './types'

const { map } = useMapStore()
const { setup: setupPlayer } = usePlayerStore()
const { setup: setupMine } = useMinesStore()

export const NormalElement: ElementType = {
  type: CellType.NORMAL,
  execute: (position: Position) => {
    map[position.left][position.top] = CellType.NORMAL
  },
}

export const WallElement: ElementType = {
  type: CellType.WALL,
  execute: (position: Position) => {
    map[position.left][position.top] = CellType.WALL
  },
}

export const PlayerElement: ElementType = {
  type: 'PLAYER',
  execute: (position: Position) => {
    setupPlayer(position)
  },
}

// export const MineElement: ElementType = {
//   type: 'MINE',
//   execute: (position: Position) => {
//     setupMine(position)
//   },
// }

export const useEditStore = defineStore('edit', () => {
  let selectElement = reactive<ElementType>({})

  function getSelectElement() {
    return selectElement
  }

  function setSelectElement(element: ElementType) {
    selectElement = element
  }

  return {
    selectElement,
    getSelectElement,
    setSelectElement,
  }
})
