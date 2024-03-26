<script setup>
defineProps({
  isEdit: Boolean,
})
</script>

<template>
  <div h5 w5 :class="{ 'border-gray-200 dark:border-gray-800 border-b border-l': isEdit }" />
</template>
