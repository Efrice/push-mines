import type { ElementType, ElementTypes, Position } from './types'
import { useMapStore } from './map'
import { usePlayerStore } from './player'
import { useMinesStore } from './mines'
import { useBoxesStore } from './boxes'
import { CellType } from './types'
import { isSamePosition } from '~/utils'

const { map } = useMapStore()
const { positions: minesPositions, setup: setupMines, remove: removeMines } = useMinesStore()
const { positions: boxesPositions, setup: setupBoxes, remove: removeBoxes } = useBoxesStore()
const { position: playerPosition, setup: setupPlayer } = usePlayerStore()

export const NormalElement: ElementTypes = {
  type: CellType.NORMAL,
  execute: (position: Position, type?: ElementType) => {
    map[position.top][position.left] = CellType.NORMAL
    if (isSamePosition(playerPosition, position)) {
      setupPlayer({
        top: -1,
        left: -1,
      })
    }
    if (type !== 'BOX')
      removeMines(position)
    if (type !== 'MINES')
      removeBoxes(position)
  },
}

export const WallElement: ElementTypes = {
  type: CellType.WALL,
  execute: (position: Position) => {
    map[position.top][position.left] = CellType.WALL
  },
}

export const PlayerElement: ElementTypes = {
  type: 'PLAYER',
  execute: (position: Position) => {
    NormalElement.execute(position)
    setupPlayer(position)
  },
}

export const MinesElement: ElementTypes = {
  type: 'MINES',
  execute: (position: Position) => {
    NormalElement.execute(position, 'MINES')
    setupMines([...minesPositions, position])
  },
}

export const BoxElement: ElementTypes = {
  type: 'BOX',
  execute: (position: Position) => {
    NormalElement.execute(position, 'BOX')
    setupBoxes([...boxesPositions, position])
  },
}

let selectElement = reactive<ElementTypes>(NormalElement)

export function useEditStore() {
  function getSelectElement() {
    return selectElement
  }

  function setSelectElement(element: ElementTypes) {
    selectElement = element
  }

  return {
    selectElement,
    getSelectElement,
    setSelectElement,
  }
}
