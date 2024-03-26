<script setup lang="ts">
import { setup } from '~/utils'
import level1 from '~/data/level1.json'
import { useMinesStore } from '~/store/mines'
import { useBoxesStore } from '~/store/boxes'

setup(level1)

const { positions: minesPosition } = useMinesStore()
const { positions: boxesPosition } = useBoxesStore()

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
      <Confetti :passed />
    </Map>
  </div>
</template>
