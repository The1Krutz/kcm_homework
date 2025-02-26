<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';

import Teleprompter from './components/Teleprompter.vue';
import Controls from './components/Controls.vue';
import { type PrompterEvent, type PToken } from './components/types';
import { sampleScript, TokenizeScript } from './components/data';

const tokenizedText: Ref<PToken[]> = ref([]);
const prompter: Ref<InstanceType<typeof Teleprompter> | null> = ref(null);
const controls: Ref<InstanceType<typeof Controls> | null> = ref(null);

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

function onSetSpeed(newSpeed: number) {
  console.log('App.onSetSpeed');
  prompter.value?.SetSpeedMultiplier(newSpeed);
}

function onSetSize(newSize: number) {
  console.log('App.onSetSize');
  prompter.value?.SetFontSize(newSize);
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
});
</script>

<template>
  <main>
    <Teleprompter :tokenizedText="tokenizedText" @prompterEvent="onPrompterEvent" ref="prompter" />
    <Controls
      @start="onStart"
      @stop="onStop"
      @reset="onReset"
      @setSpeed="onSetSpeed"
      @setSize="onSetSize"
      ref="controls"
    />
  </main>
</template>

<style scoped></style>
