<script setup lang="ts">
defineProps<{}>();

const emitEvent = defineEmits<{
  start: [];
  stop: [];
  reset: [];
  // TODO - new events for other controls like speed and size
}>();
</script>

<template>
  <div class="controls">
    <button @click="emitEvent('start')">Start</button>
    <button @click="emitEvent('stop')">Stop</button>
    <button @click="emitEvent('reset')">Reset</button>
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
}

.controls button {
  font-size: x-large;
}
</style>
