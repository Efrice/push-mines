<script setup lang="ts">
import { BoxElement, MinesElement, NormalElement, PlayerElement, WallElement, useEditStore } from '../store/edit'
import { useMapStore } from '~/store/map'
import { usePlayerStore } from '~/store/player'
import { useBoxesStore } from '~/store/boxes'
import { useMinesStore } from '~/store/mines'
import type { ElementTypes } from '~/store/types'
import { getMap, setup } from '~/composables'

const emit = defineEmits(['play'])

const isEdit = true
const rows = ref(8)
const cols = ref(8)
const { map, setup: setupMap } = useMapStore()
const { position: player, setup: setupPlayer } = usePlayerStore()
const { positions: boxes, setup: setupBoxes } = useBoxesStore()
const { positions: mines, setup: setupMines } = useMinesStore()

const playerStart = {
  top: -1,
  left: -1,
}
setup({
  map: Array.from({ length: rows.value }, () => Array.from({ length: cols.value }, () => 0)),
  mines: [],
  boxes: [],
  player: Object.assign({}, playerStart),
})

watch(rows, (rows: number, raw: number) => {
  if (raw < rows) {
    map.push(Array.from({ length: cols.value }, () => 0))
    setupMap(map)
  }
  else {
    map.pop()
    setupMap(map)
    updateRows(rows)
  }
})
function updateRows(rows: number) {
  if (player.top === rows)
    setupPlayer(Object.assign({}, playerStart))

  for (let i = 0; i < boxes.length; i++) {
    const box = boxes[i]
    if (box.top === rows) {
      boxes.splice(i, 1)
      i--
    }
  }
  setupBoxes(boxes)

  for (let i = 0; i < mines.length; i++) {
    const mine = mines[i]
    if (mine.top === rows) {
      mines.splice(i, 1)
      i--
    }
  }
  setupMines(mines)
}

watch(cols, (cols: number, raw: number) => {
  if (raw < cols) {
    map.forEach(item => item.push(0))
    setupMap(map)
  }
  else {
    map.forEach(item => item.pop())
    setupMap(map)
    updateCols(cols)
  }
})
function updateCols(cols: number) {
  if (player.left === cols)
    setupPlayer(Object.assign({}, playerStart))

  for (let i = 0; i < boxes.length; i++) {
    const box = boxes[i]
    if (box.left === cols) {
      boxes.splice(i, 1)
      i--
    }
  }
  setupBoxes(boxes)

  for (let i = 0; i < mines.length; i++) {
    const mine = mines[i]
    if (mine.left === cols) {
      mines.splice(i, 1)
      i--
    }
  }
  setupMines(mines)
}

const { setSelectElement } = useEditStore()

function handleClick(element: ElementTypes) {
  setSelectElement(element)
}

function goPlay() {
  if (checkGame())
    emit('play', getMap())
}
function checkGame() {
  if (player.top === playerStart.top && player.left === playerStart.left) {
    $message.error('Game need a player.')
    return false
  }
  if (mines.length === 0 || boxes.length === 0) {
    $message.error('The number of mines or boxes at least one.')
    return false
  }
  if (boxes.length !== mines.length || boxes.length === 0) {
    $message.error('The number of mines and boxes is not equal.')
    return false
  }

  return true
}
</script>

<template>
  <div m-auto w-fit p4>
    EDIT MAP
    <div flex justify-center p2>
      <div flex place-content-between>
        <label for="rows">rows: </label>
        <input
          id="rows"
          v-model="rows"
          type="number"
          ml-2 w-12 p0
          text="center"
          bg="transparent"
          border="~ rounded gray-200 dark:gray-700"
          outline="none active:none"
        >
      </div>
      <div ml-2 flex place-content-between>
        <label for="cols">cols: </label>
        <input
          id="cols"
          v-model="cols"
          type="number"
          ml-2 w-12 p0
          text="center"
          bg="transparent"
          border="~ rounded gray-200 dark:gray-700"
          outline="none active:none"
        >
      </div>
    </div>
    <div flex place-content-around items-center py-2>
      <Wall @click="handleClick(WallElement)" />
      <div @click="handleClick(MinesElement)">
        <img src="../assets/mines.png">
      </div>
      <div
        h5 w5 flex items-center justify-center
        border="~ rounded gray-200 dark:gray-400"
        @click="handleClick(BoxElement)"
      >
        <div h4 w4 border="~ rounded gray-200 dark:gray-400" />
      </div>
      <div
        title="clear"
        h5 w5
        border="~ rounded gray-200 dark:gray-400"
        @click="handleClick(NormalElement)"
      />
      <div @click="handleClick(PlayerElement)">
        <img src="../assets/player.png">
      </div>
    </div>
    <Map :is-edit>
      <Mines />
      <Boxes />
      <Player :is-edit />
    </Map>
    <div mt-4 btn @click="goPlay">
      GO PLAY
    </div>
  </div>
</template>
