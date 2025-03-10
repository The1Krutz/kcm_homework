<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';

import Teleprompter from './components/Teleprompter.vue';
import Controls from './components/Controls.vue';
import { type PrompterEvent, type PToken } from './components/types';
import { sampleScript, TokenizeScript } from './components/data';

const tokenizedText: Ref<PToken[]> = ref([]);
const prompter: Ref<InstanceType<typeof Teleprompter> | null> = ref(null);
const controls: Ref<InstanceType<typeof Controls> | null> = ref(null);

// #region Prompter responding to events from Controls
function onStart() {
  prompter.value?.StartPrompter();
}

function onStop() {
  prompter.value?.StopPrompter();
}

function onReset() {
  prompter.value?.ResetPrompter();
}

function onSetSpeed(newSpeed: number) {
  prompter.value?.SetSpeedMultiplier(newSpeed);
}

function onSetSize(newSize: number) {
  prompter.value?.SetFontSize(newSize);
}
// #endregion

// #region Controls responding to events from Prompter
function onPrompterEvent(event: PrompterEvent) {
  controls.value?.onPrompterEvent(event);
}
// #endregion

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
