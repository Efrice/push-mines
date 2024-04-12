<script setup lang="ts">
defineProps<{
  show: boolean
  content: string
}>()
</script>

<template>
  <Transition>
    <div v-if="show" class="message" :class="{ show }">
      {{ content }}
    </div>
  </Transition>
</template>

<style scoped>
.message {
  position: fixed;
  top: -20px;
  text-align: center;
  width: fit-content;
  padding: 4px 10px;
  border: 1px solid #000;
  transition: all 3s ease;
  &.show {
    top: 20px;
  }
}
</style>
