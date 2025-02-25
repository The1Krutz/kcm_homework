<script setup lang="ts">
import { ref, useTemplateRef, type Ref, type ShallowRef } from 'vue';
import { MaxFontSize, MaxScrollSpeed, MinFontSize, MinScrollSpeed } from './data';
import type { PToken } from './types';

const props = defineProps<{ tokenizedText: PToken[] }>();
const emitEvent = defineEmits<{
  'start-playback': [];
  'stop-playback': [];
  'reset-playback': [];
  'change-camera': [target: string];
  'change-image': [target: string];
  'change-section': [target: string];
}>();
defineExpose({
  StartPrompter,
  StopPrompter,
  ResetPrompter,
});

function StartPrompter() {
  processNextToken();
  emitEvent('start-playback');
}

function StopPrompter() {
  clearTimeout(currentTimeout.value);

  emitEvent('stop-playback');
}

function ResetPrompter() {
  currentFocusToken.value = 0;
  scrollToFocusToken();

  emitEvent('reset-playback');
}

function SetScrollSpeed(newSpeed: number) {
  // enforce some reasonable limits before setting the font size
  if (newSpeed > MaxScrollSpeed) {
    scrollSpeed.value = MaxScrollSpeed;
  } else if (newSpeed < MinScrollSpeed) {
    scrollSpeed.value = MinScrollSpeed;
  } else {
    scrollSpeed.value = newSpeed;
  }
}

function SetFontSize(newSize: number) {
  // enforce some reasonable limits before setting the font size
  if (newSize > MaxFontSize) {
    fontSize.value = MaxFontSize;
  } else if (newSize < MinFontSize) {
    fontSize.value = MinFontSize;
  } else {
    fontSize.value = newSize;
  }
}

function processNextToken() {
  currentFocusToken.value++;

  // handle every token type, and set up the timer to advance to the next token
  const currentToken = props.tokenizedText[currentFocusToken.value];

  if (currentToken.type === 'text') {
    // handle text tokens

    scrollToFocusToken();

    currentTimeout.value = setTimeout(() => {
      processNextToken();
    }, 500);
  } else if (currentToken.type === 'event') {
    // TODO - handle events
    console.log('tomato', 'jorp');

    // since this token was not visible, immediately process the next one
    processNextToken();

    if (currentToken.eventType === 'switchToCamera') {
      emitEvent('change-camera', currentToken.eventTarget);
    } else if (currentToken.eventType === 'switchToImage') {
      emitEvent('change-image', currentToken.eventTarget);
    } else if (currentToken.eventType === 'switchSection') {
      emitEvent('change-section', currentToken.eventTarget);
    }
  }
}

function scrollToFocusToken() {
  const focusToken = focusMe.value?.[currentFocusToken.value];
  console.log(focusToken);

  focusToken?.scrollIntoView({ behavior: 'auto' });
}

const fontSize: Ref<number> = ref(20);
const scrollSpeed: Ref<number> = ref(20);
const currentFocusToken: Ref<number> = ref(0); // id of the currently focused token, controls scrolling behavior
const focusMe = useTemplateRef('focusMe');
const currentTimeout: Ref<number> = ref(0);
</script>

<template>
  <div class="greetings">Teleprompter display</div>
  <div class="prompterText">
    <!-- <template v-for="token in tokenizedText" ref="focusMe">
      <span
        v-if="token.type === 'text'"
        :key="token.id"
        :class="{
          focus: token.id === currentFocusToken,
        }"
        >{{ token.text }}
      </span>

      <span v-if="token.type === 'event'" :key="token.id" class="hidden"></span>
    </template> -->

    <span
      v-for="token in tokenizedText"
      :key="token.id"
      :class="{
        focus: token.id === currentFocusToken,
      }"
      ref="focusMe"
      >{{ token.type === 'text' ? token.text : '' }}
    </span>
  </div>
</template>

<style scoped>
.prompterText {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 5px;

  height: 50px;
  width: 400px;
  overflow-y: auto;
  scroll-behavior: smooth;

  border: 1px dashed red;
}

.prompterText span {
  font-size: v-bind(fontSize + 'px');
  border: 1px dashed blue;
  width: fit-content;
  height: fit-content;
}

.focus {
  background-color: green;
  color: yellow;
}

.hidden {
  display: none;
}
</style>
