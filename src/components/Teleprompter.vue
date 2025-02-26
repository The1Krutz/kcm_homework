<script setup lang="ts">
import { ref, useTemplateRef, type Ref } from 'vue';
import type { PrompterEvent, PToken } from './types';
import { formatTime } from './data';

const props = defineProps<{
  tokenizedText: PToken[];
}>();
const emitEvent = defineEmits<{
  prompterEvent: [event: PrompterEvent];
}>();
defineExpose({
  StartPrompter,
  StopPrompter,
  ResetPrompter,
  SetSpeedMultiplier,
  SetFontSize,
});

const basePlaybackSpeed = 200; // base scroll speed is 5 words per second

const currentFocusToken: Ref<number> = ref(-1); // id of the currently focused token, controls scrolling behavior
const focusMe = useTemplateRef<HTMLSpanElement[]>('focusMe'); // list of all focusable text tokens
const currentTimeout: Ref<number> = ref(0); // timer for the focus to move to the next word token. Used for cancelling the timer when necessary
const isPlaying: Ref<boolean> = ref(false); // flag for whether the player is currently playing. Used to prevent strange behavior if user clicks the start button multiple times
const playbackSpeedMultiplier: Ref<number> = ref(1);
const prompterFontSize: Ref<number> = ref(40);
const remainingMs: Ref<number> = ref(0); // estimated time to finish, in milliseconds (because that's how the timeout is stored)

// #region exports
function StartPrompter() {
  if (isPlaying.value) {
    // early out if the player is already running
    return;
  }

  emitEvent('prompterEvent', { event: 'startPlayback' });
  isPlaying.value = true;
  processNextToken();
}

function StopPrompter() {
  if (!isPlaying.value) {
    // early out if the player is already stopped
    return;
  }

  emitEvent('prompterEvent', { event: 'stopPlayback' });
  isPlaying.value = false;
  clearTimeout(currentTimeout.value);
}

function ResetPrompter() {
  emitEvent('prompterEvent', { event: 'resetPlayback' });
  currentFocusToken.value = -1;
  scrollToBeginning();
}

function SetSpeedMultiplier(newSpeed: number) {
  playbackSpeedMultiplier.value = newSpeed;
}

function SetFontSize(newSize: number) {
  prompterFontSize.value = newSize;
}
// #endregion

// do the math to turn the playback speed multiplier into milliseconds for the next word
function getTimeToNextToken() {
  /**
   * base speed divided by the multiplier, since x2 speed means 1/2 the time, and setTimeout takes ms
   */
  return basePlaybackSpeed / playbackSpeedMultiplier.value;
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

    const timeUntilNext = getTimeToNextToken();
    // estimate the remaining reading time using the remaining words * the time to the next word. This speed is not
    // affected by the size of the teleprompter or font, since the scroll rate is only tied to word count
    const remainingTokens = props.tokenizedText.length - currentFocusToken.value;
    remainingMs.value = timeUntilNext * remainingTokens;

    currentTimeout.value = setTimeout(() => {
      processNextToken();
    }, timeUntilNext);
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
  } else if (currentToken.type === 'render') {
    // these tokens are not processed here at all; they're used to control the display of the prompter. Just move on
    processNextToken();
  }
}

// gently scroll to the next token
function scrollToFocusToken() {
  focusMe.value?.[currentFocusToken.value]?.scrollIntoView({ behavior: 'smooth' });
}

// instantly scroll back to the top
function scrollToBeginning() {
  const firstDisplayableToken = props.tokenizedText.findIndex((z) => z.type === 'text');
  focusMe.value?.[firstDisplayableToken]?.scrollIntoView({ behavior: 'instant' });
}
</script>

<template>
  <div class="prompterTitle">
    Teleprompter display (est. {{ formatTime(remainingMs) }} to finish)
  </div>
  <div class="prompterText">
    <span
      v-for="token in tokenizedText"
      :key="token.id"
      :class="{
        focus: token.id === currentFocusToken,
        hidden: token.type === 'event',
        lineBreak: token.type === 'render' && token.render === 'lineBreak',
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
  /* spaces between text are a little weird at higher font sizes since we're doing everything on the word level */
  gap: v-bind((prompterFontSize/4) + 'px');

  height: 350px;
  width: 500px;
  overflow-y: hidden;
  scroll-behavior: smooth;

  border: 1px solid grey;
}

.prompterText span {
  font-size: v-bind(prompterFontSize + 'px');
  height: fit-content;
}

.focus {
  background-color: green;
  color: yellow;
}

.hidden {
  display: none;
}

.lineBreak {
  /* full width item in a flex box will push itself onto a new line, and force everything after it onto its own line too */
  width: 100%;
}
</style>
