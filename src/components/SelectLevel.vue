<script setup lang="ts">
const emit = defineEmits(['select'])

const options = ['1', '2', '3']
const val = ref('1')
function handleChange(e: Event) {
  val.value = (e.target as HTMLSelectElement).value
}

async function handleClick() {
  const game = await import(`../data/level${val.value}.json`)
  emit('select', game)
}
</script>

<template>
  <div m-auto w-60 flex justify-between>
    <div>Select Level: </div>
    <select w-12 b-rd-1 bg-gray-600 @change="handleChange">
      <option v-for="op in options" :key="op" :value="op">
        {{ op }}
      </option>
    </select>
    <div btn @click="handleClick">
      Go Level
    </div>
  </div>
</template>
