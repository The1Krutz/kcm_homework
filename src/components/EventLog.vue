<script setup lang="ts">
import { useTemplateRef, watch } from 'vue';
import type { PrompterEvent } from './types';

const props = defineProps<{
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

const eventsItem = useTemplateRef<HTMLParagraphElement[]>('eventsItem');

watch(props.events, () => {
  eventsItem.value?.[eventsItem.value.length - 1]?.scrollIntoView({ behavior: 'smooth' });
});
</script>

<template>
  <div class="log-container">
    <label for="#event-list">Event Log</label>
    <div id="event-list" class="event-list">
      <p v-for="event in events" ref="eventsItem">{{ getEventDisplayText(event) }}</p>
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

.event-list p {
  border: 1px dashed blue;
}
</style>
