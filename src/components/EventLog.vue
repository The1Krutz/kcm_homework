<script setup lang="ts">
import type { PrompterEvent } from './types';

defineProps<{
  events: PrompterEvent[];
}>();

function getEventDisplayText(event: PrompterEvent): string {
  switch (event?.event) {
    case 'switchToCamera':
      return `Camera: ${event.target}`;
    case 'switchToImage':
      return `Image: ${event.target}`;
    case 'switchSection':
      return `Section: ${event.target}`;
    case 'startPlayback':
      return `Start`;
    case 'stopPlayback':
      return `Stop`;
    case 'resetPlayback':
      return `Reset`;
    default:
      return 'oops';
  }
}
</script>

<template>
  <div class="log-container">
    <label for="#event-list">Event Log</label>
    <div id="event-list" class="event-list">
      <p v-for="event in events">{{ getEventDisplayText(event) }}</p>
    </div>
  </div>
</template>

<style scoped>
.log-container {
  border: 1px dashed red;
}

label {
  border: 1px dashed green;
}

.event-list {
  border: 1px dashed yellow;
  max-height: 100px;
  overflow: auto;
}
</style>
