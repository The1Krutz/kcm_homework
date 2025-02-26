<script setup lang="ts">
import { ref, useTemplateRef, type Ref, type ShallowRef } from 'vue';
import { MaxFontSize, MaxScrollSpeed, MinFontSize, MinScrollSpeed } from './data';
import type { PrompterEvent, PToken } from './types';

const props = defineProps<{ tokenizedText: PToken[] }>();
const emitEvent = defineEmits<{
  prompterEvent: [event: PrompterEvent];
}>();
defineExpose({
  StartPrompter,
  StopPrompter,
  ResetPrompter,
});

function StartPrompter() {
  emitEvent('prompterEvent', { event: 'startPlayback' });
  processNextToken();
}

function StopPrompter() {
  emitEvent('prompterEvent', { event: 'stopPlayback' });
  clearTimeout(currentTimeout.value);
}

function ResetPrompter() {
  emitEvent('prompterEvent', { event: 'resetPlayback' });
  currentFocusToken.value = 0;
  scrollToFocusToken();
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

  if (currentToken == null) {
    StopPrompter();
  } else if (currentToken.type === 'text') {
    // handle text tokens

    scrollToFocusToken();

    currentTimeout.value = setTimeout(() => {
      processNextToken();
    }, scrollSpeed.value);
  } else if (currentToken.type === 'event') {
    // emit events for non-visible tokens
    if (currentToken.eventType === 'switchToCamera') {
      emitEvent('prompterEvent', { event: 'switchToCamera', target: currentToken.eventTarget });
    } else if (currentToken.eventType === 'switchToImage') {
      emitEvent('prompterEvent', { event: 'switchToImage', target: currentToken.eventTarget });
    } else if (currentToken.eventType === 'switchSection') {
      emitEvent('prompterEvent', { event: 'switchSection', target: currentToken.eventTarget });
    }

    // since this token was not visible, immediately process the next one
    processNextToken();
  }
}

function scrollToFocusToken() {
  focusMe.value?.[currentFocusToken.value]?.scrollIntoView({ behavior: 'smooth' });
}

const fontSize: Ref<number> = ref(20);
const scrollSpeed: Ref<number> = ref(200);
const currentFocusToken: Ref<number> = ref(0); // id of the currently focused token, controls scrolling behavior
const focusMe = useTemplateRef<HTMLSpanElement[]>('focusMe');
const currentTimeout: Ref<number> = ref(0);
</script>

<template>
  <div class="greetings">Teleprompter display</div>
  <div class="prompterText">
    <span
      v-for="token in tokenizedText"
      :key="token.id"
      :class="{
        focus: token.id === currentFocusToken,
        hidden: token.type === 'event',
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
  overflow-y: hidden;
  scroll-behavior: smooth;

  border: 1px dashed red;
}

.prompterText span {
  font-size: v-bind(fontSize + 'px');
  width: fit-content;
  height: fit-content;
}

.focus {
  background-color: green;
  color: yellow;
}

.hidden {
  width: 0;
  height: 0;
  margin-left: -5px;
}
</style>
