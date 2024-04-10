import type { Position } from '~/store/types'

export function isSamePosition(p1: Position, p2: Position): boolean {
  return p1.top === p2.top && p1.left === p2.left
}
