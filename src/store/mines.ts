import { defineStore } from 'pinia'
import { useMapStore } from './map'
import type { Position } from './types'

export const useMinesStore = defineStore('mines', () => {
  const { isWall } = useMapStore()

  const positions = reactive<Position[]>([])

  function setup(newPos: Position[]) {
    positions.splice(0, positions.length, ...newPos)
  }

  function moveLeft({ top, left }: Position): boolean {
    const current = positions.find(position => position.top === top && position.left === left)
    const leftPostion = {
      top,
      left: left - 1,
    }
    if (isWall(leftPostion))
      return false
    if (isMine(leftPostion))
      return false
    if (current)
      current.left -= 1
    return true
  }

  function moveRight({ top, left }: Position): boolean {
    const current = positions.find(position => position.top === top && position.left === left)
    const rightPostion = {
      top,
      left: left + 1,
    }
    if (isWall(rightPostion))
      return false
    if (isMine(rightPostion))
      return false
    if (current)
      current.left += 1
    return true
  }

  function moveUp({ top, left }: Position): boolean {
    const current = positions.find(position => position.top === top && position.left === left)
    const upPostion = {
      top: top - 1,
      left,
    }
    if (isWall(upPostion))
      return false
    if (isMine(upPostion))
      return false
    if (current)
      current.top -= 1
    return true
  }

  function moveDown({ top, left }: Position): boolean {
    const current = positions.find(position => position.top === top && position.left === left)
    const upPostion = {
      top: top + 1,
      left,
    }
    if (isWall(upPostion))
      return false
    if (isMine(upPostion))
      return false
    if (current)
      current.top += 1
    return true
  }

  function isMine({ top, left }: Position): Position | undefined {
    return positions.find(position => position.top === top && position.left === left)
  }

  return {
    positions,
    setup,
    moveLeft,
    moveRight,
    moveUp,
    moveDown,
    isMine,
  }
})
