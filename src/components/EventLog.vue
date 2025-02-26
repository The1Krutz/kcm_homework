<script setup lang="ts">
import { nextTick, useTemplateRef, watch } from 'vue';
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

watch(props.events, async () => {
  /**
   * We're watching the event history prop, so we need to let the DOM finish updating before we try to scroll to the
   * bottom. If we scroll right away, there will be one item below the scroll. I'm sure there's a better way to do this,
   * but it works for now.
   */
  await nextTick();

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
  font-size: larger;
}

.event-list {
  max-height: 100px;
  overflow: auto;
}
</style>
