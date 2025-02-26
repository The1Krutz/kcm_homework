<script setup lang="ts">
import Status from './Status.vue';
import EventLog from './EventLog.vue';
import { ref, type Ref } from 'vue';
import { StatusOption, type PrompterEvent, type PrompterStatus } from './types';

defineProps<{}>();

defineExpose({
  onPrompterEvent,
});

const emitEvent = defineEmits<{
  start: [];
  stop: [];
  reset: [];
  setSpeed: [newSpeed: number];
  setSize: [newSize: number];
}>();

const defaultStatus: PrompterStatus = {
  status: StatusOption.Stopped,
  feed: 'n/a',
  section: 'n/a',
};

const eventHistory: Ref<PrompterEvent[]> = ref([]);
const currentStatus: Ref<PrompterStatus> = ref(defaultStatus);

function onPrompterEvent(event: PrompterEvent) {
  switch (event.event) {
    case 'switchToCamera':
      console.log('Controls.onChangeCamera');
      currentStatus.value.feed = event.target;
      break;
    case 'switchToImage':
      console.log('Controls.onChangeImage');
      currentStatus.value.feed = event.target;
    case 'switchSection':
      console.log('Controls.onChangeSection');
      currentStatus.value.section = event.target;
      break;
    case 'startPlayback':
      console.log('Controls.onStartPlayback');
      currentStatus.value.status = StatusOption.Running;
      break;
    case 'stopPlayback':
      console.log('Controls.onStopPlayback');
      currentStatus.value.status = StatusOption.Stopped;
      break;
    case 'resetPlayback':
      console.log('Controls.onResetPlayback');
      /**
       * This keeps the current running state (ie if it's running, keep running) but resets the feed/section so the start tags can set them
       */
      currentStatus.value.feed = defaultStatus.feed;
      currentStatus.value.section = defaultStatus.section;
      // clear event history, but do it in a strange way because otherwise it seems to break the ref and stop triggering the watcher
      eventHistory.value.length = 0;
      break;
  }
  eventHistory.value.push(event);
}
</script>

<template>
  <div class="controls">
    <EventLog :eventHistory="eventHistory" />
    <Status :status="currentStatus" />
  </div>

  <div class="controlButtons">
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
}

.controlButtons {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
  width: 500px;
}

.controlButtons button {
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
