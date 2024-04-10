<script setup lang="ts">
import { useMapStore } from '~/store/map'
import { useEditStore } from '~/store/edit'
import { CellType } from '~/store/types'

const props = defineProps({
  isEdit: Boolean,
})

const { map } = useMapStore()
const { getSelectElement } = useEditStore()

function execute(i: number, j: number) {
  if (getSelectElement().execute) {
    getSelectElement().execute({
      top: i,
      left: j,
    })
  }
}
const isKeydown = ref(false)
function handleMousedown(e: MouseEvent, i: number, j: number) {
  e.preventDefault()
  if (!props.isEdit)
    return
  execute(i, j)
  isKeydown.value = true
}
function handleMousemove(i: number, j: number) {
  if (!props.isEdit || !isKeydown.value)
    return
  execute(i, j)
}
function handleMouseup(i: number, j: number) {
  if (!props.isEdit)
    return
  execute(i, j)
  isKeydown.value = false
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
        @mousedown="handleMousedown($event, i, j)"
        @mouseover="handleMousemove(i, j)"
        @mouseup="handleMouseup(i, j)"
      >
        <Wall v-if="map[i][j] === CellType.WALL" />
        <Normal v-else :is-edit />
      </div>
    </div>
    <slot />
  </div>
</template>
