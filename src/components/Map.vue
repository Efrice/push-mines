<script setup lang="ts">
import { useMapStore } from '~/store/map'
import { CellType } from '~/store/types'

const { map } = useMapStore()
</script>

<template>
  <div id="map" relative m-auto w-fit>
    <div v-for="(item, i) in map" :key="i" flex>
      <template
        v-for="(_, j) in item"
        :key="i * 10 + j"
      >
        <Wall v-if="map[i][j] === CellType.WALL" />
        <Normal v-else />
      </template>
    </div>
    <slot />
  </div>
</template>
