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

const eventHistory: Ref<PrompterEvent[]> = ref([]);
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

function onPrompterEvent(event: PrompterEvent) {
  switch (event.event) {
    case 'switchToCamera':
      console.log('App.onChangeCamera');
      currentStatus.value.feed = event.target;
      break;
    case 'switchToImage':
      console.log('App.onChangeImage');
      currentStatus.value.feed = event.target;
    case 'switchSection':
      console.log('App.onChangeSection');
      currentStatus.value.section = event.target;
      break;
    case 'startPlayback':
      console.log('App.onStartPlayback');
      currentStatus.value.status = StatusOption.Running;
      break;
    case 'stopPlayback':
      console.log('App.onStopPlayback');
      currentStatus.value.status = StatusOption.Stopped;
      break;
    case 'resetPlayback':
      console.log('App.onResetPlayback');
      /**
       * This keeps the current running state (ie if it's running, keep running) but resets the feed/section so the start tags can set them
       */
      currentStatus.value.feed = '';
      currentStatus.value.section = '';
      break;
  }
  eventHistory.value.push(event);
}

onMounted(() => {
  tokenizedText.value = TokenizeScript(sampleScript);
  console.log('tomato', 'mounted', tokenizedText.value);
});
</script>

<template>
  <main>
    <Teleprompter :tokenizedText="tokenizedText" @prompterEvent="onPrompterEvent" ref="prompter" />
    <Status :status="currentStatus" />
    <EventLog :events="eventHistory" />
    <Controls @start="() => onStart()" @stop="() => onStop()" @reset="() => onReset()" />
  </main>
</template>

<style scoped></style>
