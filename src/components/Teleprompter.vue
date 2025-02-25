<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { MaxFontSize, MaxScrollSpeed, MinFontSize, MinScrollSpeed } from './data';
import type { PToken } from './types';

defineProps<{ tokenizedText: PToken[] }>();

function StartPrompter() {}
function StopPrompter() {}
function ResetPrompter() {}

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

const fontSize: Ref<number> = ref(20);
const scrollSpeed: Ref<number> = ref(20);
const currentFocusToken: Ref<number> = ref(3); // id of the currently focused token, controls scrolling behavior
</script>

<template>
  <div class="greetings">Teleprompter display</div>
  <div class="prompterText">
    <template v-for="token in tokenizedText">
      <span
        v-if="token.type === 'text'"
        :key="token.id"
        :class="{
          focus: token.id === currentFocusToken,
        }"
        >{{ token.text }}</span
      >
      <span v-if="token.type === 'event'" :key="token.id" class="hidden">{{
        token.eventTarget
      }}</span>
    </template>
  </div>
</template>

<style scoped>
.prompterText {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 5px;

  height: 250px;
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
