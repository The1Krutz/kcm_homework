<script setup lang="ts">
import { useTemplateRef, watch } from 'vue';
import type { PrompterEvent } from './types';

const props = defineProps<{
  eventHistory: PrompterEvent[];
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

watch(
  props.eventHistory,
  () => {
    if (eventsItem.value && eventsItem.value.length > 0) {
      eventsItem.value?.[eventsItem.value.length - 1]?.scrollIntoView({ behavior: 'smooth' });
    }
  },
  { flush: 'post' },
);
</script>

<template>
  <div class="log-container">
    <label for="#event-list">Event Log</label>
    <div id="event-list" class="event-list">
      <p v-for="event in eventHistory" ref="eventsItem">{{ getEventDisplayText(event) }}</p>
    </div>
  </div>
</template>

<style scoped>
.log-container {
  border: 1px dashed red;
  width: 200px;
}

label {
  font-size: larger;
}

.event-list {
  height: 125px;
  overflow: auto;
}
</style>
