<script setup lang="ts">
import type { MapType, Position } from '~/store/types'
import { useMapStore } from '~/store/map'
import { useMinesStore } from '~/store/mines'
import { usePlayerStore } from '~/store/player'
import { useBoxesStore } from '~/store/boxes'

const { setup: setupMap } = useMapStore()
const { setup: setupPlayer } = usePlayerStore()
const { setup: setupMines, positions: minesPosition } = useMinesStore()
const { setup: setupBoxes, positions: boxesPosition } = useBoxesStore()

const map = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1],
]
const player = {
  left: 3,
  top: 3,
}
const mines = [
  {
    top: 3,
    left: 2,
  },
  {
    top: 3,
    left: 4,
  },
  {
    top: 2,
    left: 3,
  },
  {
    top: 4,
    left: 3,
  },
]
const boxes = [
  {
    top: 1,
    left: 3,
  },
  {
    top: 3,
    left: 5,
  },
  {
    top: 5,
    left: 3,
  },
  {
    top: 3,
    left: 1,
  },
]

function setup({ map, player, mines, boxes }: { map: MapType; player: Position; mines: Position[]; boxes: Position[] }) {
  setupMap(map)
  setupPlayer(player)
  setupMines(mines)
  setupBoxes(boxes)
}

setup({ map, player, mines, boxes })

const passed = computed(() => {
  return minesPosition.every(mine => boxesPosition.find(position => position.top === mine.top && position.left === mine.left))
})
</script>

<template>
  <div>
    <Map>
      <Player />
      <Mines />
      <Boxes />
      <Confetti :passed="passed" />
    </Map>
  </div>
</template>
