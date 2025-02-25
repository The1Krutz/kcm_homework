<script setup lang="ts">
import { type PrompterEvent } from './types';

defineProps<{}>();

const emitEvent = defineEmits<{
  'add-event': [event: PrompterEvent];
}>();

function onStart() {
  console.log('start clicked');
  emitEvent('add-event', { event: 'startPlayback' });
}
function onStop() {
  console.log('stop clicked');
  emitEvent('add-event', { event: 'stopPlayback' });
}
function onReset() {
  console.log('reset clicked');
  emitEvent('add-event', { event: 'resetPlayback' });
}
</script>

<template>
  <div class="controls">
    <button @click="onStart">Start</button>
    <button @click="onStop">Stop</button>
    <button @click="onReset">Reset</button>
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
