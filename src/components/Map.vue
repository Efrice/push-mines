<script setup lang="ts">
import { useMapStore } from '~/store/map'
import { useEditStore } from '~/store/edit'
import { CellType } from '~/store/types'

const props = defineProps({
  isEdit: Boolean,
})

const { map } = useMapStore()
const { getSelectElement } = useEditStore()

function handleClick(j: number, i: number) {
  if (!props.isEdit)
    return
  if (getSelectElement().execute) {
    getSelectElement().execute({
      top: i,
      left: j,
    })
  }
}
</script>

<template>
  <div
    id="map" border-grad-500 relative m-auto w-fit overflow-hidden
    :class="{ 'border-gray-200 dark:border-gray-800 border-t border-r': isEdit }"
  >
    <div v-for="(item, i) in map" :key="i" flex>
      <div
        v-for="(_, j) in item"
        :key="i * 10 + j"
        @click="handleClick(j, i)"
      >
        <Wall v-if="map[j][i] === CellType.WALL" />
        <Normal v-else :is-edit />
      </div>
    </div>
    <slot />
  </div>
</template>
