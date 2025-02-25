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
const prompter: Ref<InstanceType<typeof Teleprompter> | null> = ref(null);

function onStart() {
  console.log('App.onStart');
  prompter.value?.StartPrompter();
}

function onStop() {
  console.log('App.onStop');
  prompter.value?.StopPrompter();
}

function onReset() {
  console.log('App.onReset');
  prompter.value?.ResetPrompter();
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
    <Teleprompter :tokenizedText="tokenizedText" ref="prompter" />
    <Status :status="currentStatus" />
    <EventLog :events="debugEvents" />
    <Controls @start="() => onStart()" @stop="() => onStop()" @reset="() => onReset()" />
  </main>
</template>

<style scoped></style>
