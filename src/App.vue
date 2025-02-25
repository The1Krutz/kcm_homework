<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';

import Teleprompter from './components/Teleprompter.vue';
import Controls from './components/Controls.vue';
import Status from './components/Status.vue';
import EventLog from './components/EventLog.vue';
import {
  StatusOption,
  type PrompterEvent,
  type PrompterStatus,
  type PToken,
} from './components/types';
import { sampleScript, TokenizeScript } from './components/data';

const debugEvents: Ref<PrompterEvent[]> = ref([]);
const currentStatus: Ref<PrompterStatus> = ref({
  status: StatusOption.Stopped,
  feed: '',
  section: '',
});
const tokenizedText: Ref<PToken[]> = ref([]);

function addEvent(event: PrompterEvent) {
  debugEvents.value.push(event);
  updateStatus(event);
}

function updateStatus(event: PrompterEvent) {
  switch (event.event) {
    case 'switchToCamera':
    case 'switchToImage':
      currentStatus.value.feed = event.target;
      break;
    case 'switchSection':
      currentStatus.value.section = event.target;
      break;
    case 'startPlayback':
      currentStatus.value.status = StatusOption.Running;
      break;
    case 'stopPlayback':
      currentStatus.value.status = StatusOption.Stopped;
      break;
    case 'resetPlayback':
      /**
       * This keeps the current running state (ie if it's running, keep running) but resets the feed/section so the start tags can set them
       */
      currentStatus.value.feed = '';
      currentStatus.value.section = '';
      break;
  }
}

onMounted(() => {
  tokenizedText.value = TokenizeScript(sampleScript);
  console.log('tomato', 'mounted', tokenizedText.value);
});
</script>

<template>
  <main>
    <Teleprompter :tokenizedText="tokenizedText" />
    <Status :status="currentStatus" />
    <EventLog :events="debugEvents" />
    <Controls @add-event="(event) => addEvent(event)" />
  </main>
</template>

<style scoped></style>
