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

const defaultStatus: PrompterStatus = {
  status: StatusOption.Stopped,
  feed: 'n/a',
  section: 'n/a',
};

const tokenizedText: Ref<PToken[]> = ref([]);
const prompter: Ref<InstanceType<typeof Teleprompter> | null> = ref(null);
const controls: Ref<InstanceType<typeof Controls> | null> = ref(null);
const playbackSpeed: Ref<number> = ref(200);
const prompterFontSize: Ref<number> = ref(20);

/**
 * Prompter responding to events from the controls
 * - start, stop, reset
 * - change speed or font size
 */
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

/**
 * Controls responding to events from the prompter
 * - status updates
 * - adding to the event log
 */
function onPrompterEvent(event: PrompterEvent) {
  console.log('App.onPrompterEvent');
  controls.value?.onPrompterEvent(event);
}

onMounted(() => {
  // parse script text and send it into the prompter
  tokenizedText.value = TokenizeScript(sampleScript);
  console.log('tomato', 'mounted', tokenizedText.value);
});
</script>

<template>
  <main>
    <Teleprompter :tokenizedText="tokenizedText" @prompterEvent="onPrompterEvent" ref="prompter" />
    <Controls
      @start="() => onStart()"
      @stop="() => onStop()"
      @reset="() => onReset()"
      ref="controls"
    />
  </main>
</template>

<style scoped></style>
