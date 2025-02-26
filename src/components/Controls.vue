<script setup lang="ts">
defineProps<{}>();

const emitEvent = defineEmits<{
  start: [];
  stop: [];
  reset: [];
  setSpeed: [newSpeed: number];
  setSize: [newSize: number];
}>();
</script>

<template>
  <div class="controls">
    <button @click="emitEvent('start')">Start</button>
    <button @click="emitEvent('stop')">Stop</button>
    <button @click="emitEvent('reset')">Reset</button>
    <div class="sliderContainer">
      <div class="slider">
        <label for="speed">Speed</label>
        <input type="range" id="speed" name="speed" min="0.25" max="2.0" value="1.0" step="0.25" />
      </div>

      <div class="slider">
        <label for="fontSize">Font Size</label>
        <input
          type="range"
          id="fontSize"
          name="fontSize"
          min="0.25"
          max="2.0"
          value="1.0"
          step="0.25"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
}

.controls button {
  font-size: x-large;
}

.sliderContainer {
  border: 1px dashed red;
  display: flex;
  flex-direction: column;
}

.slider {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
}
</style>
