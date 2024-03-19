import type { Position } from '~/store/types'

const cellLen = 20

export function getStyle(position: Position) {
  return computed(() => {
    return {
      top: `${position.top * cellLen}px`,
      left: `${position.left * cellLen}px`,
    }
  })
}

export function getStyles(positions: Position[]) {
  return computed(() => {
    return positions.map((position: Position) => {
      return {
        top: `${position.top * cellLen}px`,
        left: `${position.left * cellLen}px`,
      }
    })
  })
}
