<script setup lang="ts">
import { CellType, useMapStore } from '~/store/map'

const { map, setup } = useMapStore()
const playerMap = [
  [1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1],
]
const minesMap = [
  [1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1],
]

setup(minesMap)
</script>

<template>
  <div relative m-auto w-fit border border-coolgray border-rounded>
    <div v-for="(item, i) in map" :key="i" flex>
      <template
        v-for="(_, j) in item"
        :key="i * 10 + j"
      >
        <Grid v-if="map[i][j] === CellType.GRID" />
        <Normal v-else />
      </template>
    </div>
    <slot />
  </div>
</template>
