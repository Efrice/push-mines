import { useMapStore } from './map'
import { useMinesStore } from './mines'
import type { Position, Step } from './types'

const position = reactive<Position>({
  top: -1,
  left: -1,
})

const steps: Step[] = reactive([])

export function usePlayerStore() {
  const { isWall } = useMapStore()
  const {
    isMine,
    moveLeft: moveMineLeft,
    moveRight: moveMineRight,
    moveUp: moveMineUp,
    moveDown: moveMineDown,
  } = useMinesStore()

  function setup(newPos: Position) {
    Object.assign(position, newPos)
  }

  function moveLeft() {
    const leftPosition = {
      top: position.top,
      left: position.left - 1,
    }
    if (isWall(leftPosition))
      return
    let move = true
    if (isMine(leftPosition))
      move = moveMineLeft(leftPosition)
    if (move)
      position.left -= 1
  }

  function moveRight() {
    const rightPosition = {
      top: position.top,
      left: position.left + 1,
    }
    if (isWall(rightPosition))
      return
    let move = true
    if (isMine(rightPosition))
      move = moveMineRight(rightPosition)
    if (move)
      position.left += 1
  }

  function moveUp() {
    const upPosition = {
      top: position.top - 1,
      left: position.left,
    }
    if (isWall(upPosition))
      return
    let move = true
    if (isMine(upPosition))
      move = moveMineUp(upPosition)
    if (move)
      position.top -= 1
  }

  function moveDown() {
    const downPosition = {
      top: position.top + 1,
      left: position.left,
    }
    if (isWall(downPosition))
      return
    let move = true
    if (isMine(downPosition))
      move = moveMineDown(downPosition)
    if (move)
      position.top += 1
  }

  function pushStep(step: Step) {
    steps.push(step)
  }

  function resetSteps() {
    steps.splice(0, steps.length)
  }

  return {
    position,
    steps,
    resetSteps,
    pushStep,
    setup,
    moveLeft,
    moveRight,
    moveUp,
    moveDown,
  }
}
