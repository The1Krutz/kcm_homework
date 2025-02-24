<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { MaxFontSize, MaxScrollSpeed, MinFontSize, MinScrollSpeed } from './data'

defineProps<{}>()

function StartPrompter() {}
function StopPrompter() {}
function ResetPrompter() {}

function SetScrollSpeed(newSpeed: number) {
  // enforce some reasonable limits before setting the font size
  if (newSpeed > MaxScrollSpeed) {
    scrollSpeed.value = MaxScrollSpeed
  } else if (newSpeed < MinScrollSpeed) {
    scrollSpeed.value = MinScrollSpeed
  } else {
    scrollSpeed.value = newSpeed
  }
}

function SetFontSize(newSize: number) {
  // enforce some reasonable limits before setting the font size
  if (newSize > MaxFontSize) {
    fontSize.value = MaxFontSize
  } else if (newSize < MinFontSize) {
    fontSize.value = MinFontSize
  } else {
    fontSize.value = newSize
  }
}

const fontSize: Ref<number> = ref(20)
const scrollSpeed: Ref<number> = ref(20)
</script>

<template>
  <div class="greetings">Teleprompter display</div>
  <div class="prompterText">
    <p>
      Stranded. Yes, she was now the first person ever to land on Venus, but that was of little
      consequence. Her name would be read by millions in school as the first to land here, but that
      celebrity would never actually be seen by her. She looked at the control panel and knew there
      was nothing that would ever get it back into working order. She was the first and it was not
      clear this would also be her last.
    </p>
    <p>
      Housework could be everyone’s work, not just “women’s work”. Why do women enable men to act
      oblivious to cleaning, grocery shopping, pet feeding, etc? Somehow when men live alone they
      figure out how to do all of those things all on their own. My friend’s husband claimed he
      didn’t know that sheets should be washed more than once a season. He said he didn’t know one
      had to clean toilets. He assumed that since you flush toilets they clean themselves. She tried
      to get him to help but he did an awful job so she let him off the hook. Wouldn’t it be better
      if she spent the time and energy to get him to do it right instead of letting him claim he is
      “just bad at it”. My sons were raised to clean toilets and change their own sheets. Hopefully,
      in their future homes, the housework will be equally divided.
    </p>
    <p>
      Balloons are pretty and come in different colors, different shapes, different sizes, and they
      can even adjust sizes as needed. But don't make them too big or they might just pop, and then
      bye-bye balloon. It'll be gone and lost for the rest of mankind. They can serve a variety of
      purposes, from decorating to water balloon wars. You just have to use your head to think a
      little bit about what to do with them.
    </p>
  </div>
</template>

<style scoped>
.prompterText {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 5px;
}
.prompterText p {
  font-size: v-bind(fontSize + 'px');
}
</style>
