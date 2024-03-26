<script setup lang="ts">
import { watchEffect } from 'vue'
import { useMapStore } from '../store/map'
import { NormalElement, PlayerElement, WallElement, useEditStore } from '../store/edit'
import type { ElementType } from '~/store/types'

const { setup } = useMapStore()

const isEdit = true
const rows = ref(8)
const cols = ref(8)

watchEffect(() => {
  setup(Array.from({ length: rows.value }, () => Array.from({ length: cols.value }, () => 0)))
})

const { setSelectElement } = useEditStore()

function handleClick(element: ElementType) {
  setSelectElement(element)
}
</script>

<template>
  <div m-auto w-fit p4>
    EDIT MAP
    <div flex p2>
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
      <div>
        <img src="../assets/mines.png">
      </div>
      <div
        h5 w5 flex items-center justify-center
        border="~ rounded gray-200 dark:gray-400"
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
      <Player />
    </Map>
  </div>
</template>
