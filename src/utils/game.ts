import type { Game } from '~/store/types'
import { useMapStore } from '~/store/map'
import { useMinesStore } from '~/store/mines'
import { usePlayerStore } from '~/store/player'
import { useBoxesStore } from '~/store/boxes'

const { setup: setupMap } = useMapStore()
const { setup: setupPlayer } = usePlayerStore()
const { setup: setupMines } = useMinesStore()
const { setup: setupBoxes } = useBoxesStore()

export function setup({ map, player, mines, boxes }: Game) {
  setupMap(map)
  setupPlayer(player)
  setupMines(mines)
  setupBoxes(boxes)
}
