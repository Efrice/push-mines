import type { Game, Step } from '~/store/types'
import { useMapStore } from '~/store/map'
import { useMinesStore } from '~/store/mines'
import { usePlayerStore } from '~/store/player'
import { useBoxesStore } from '~/store/boxes'
import { deflate } from '~/utils'
import { stepOperations } from '~/composables'

const { map, setup: setupMap } = useMapStore()
const { position: player, setup: setupPlayer, pushStep } = usePlayerStore()
const { positions: mines, setup: setupMines } = useMinesStore()
const { positions: boxes, setup: setupBoxes } = useBoxesStore()

export function setup({ map, player, mines, boxes }: Game) {
  setupMap(map)
  setupPlayer(player)
  setupMines(mines)
  setupBoxes(boxes)
}

export function compressUrl() {
  return deflate({
    map,
    player,
    mines,
    boxes,
  })
}

export function howPlay(steps: Step[]) {
  if (steps.length > 0) {
    steps.forEach((step: Step, i: number) => {
      setTimeout(async () => {
        stepOperations[step]()
        pushStep(step)
      }, 500 * (i + 1))
    })
  }
}
