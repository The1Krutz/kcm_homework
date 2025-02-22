<script setup lang="ts">
import { ref, type Ref } from 'vue'

import Teleprompter from './components/Teleprompter.vue'
import Controls from './components/Controls.vue'
import Status from './components/Status.vue'
import EventLog from './components/EventLog.vue'
import { EventName, StatusOption, type PrompterStatus } from './components/types'

const debugEvents: Ref<string[]> = ref([])
const currentStatus: Ref<PrompterStatus> = ref({ status: StatusOption.Stopped, feed: 'no feed' })

function addEvent(eventName: EventName) {
  debugEvents.value.push(eventName)
  currentStatus.value.status = getStatusFromEvent(eventName)
}

function getStatusFromEvent(eventName: EventName): StatusOption {
  if (eventName === EventName.Start) {
    return StatusOption.Running
  } else {
    return StatusOption.Stopped
  }
}
</script>

<template>
  <main>
    <Teleprompter />
    <Status :status="currentStatus" />
    <EventLog :events="debugEvents" />
    <Controls @add-event="(event) => addEvent(event)" />
  </main>
</template>

<style scoped></style>
