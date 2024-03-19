<script setup lang="ts">
import { useMapStore } from '~/store/map'
import { CellType } from '~/store/types'

const { map } = useMapStore()
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
