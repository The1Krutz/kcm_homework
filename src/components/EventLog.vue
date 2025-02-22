<script setup lang="ts">
defineProps<{
  events: string[]
}>()
</script>

<template>
  <div class="log-container">
    <label for="#event-list">Event Log</label>
    <div id="event-list" class="event-list">
      <p v-for="event in events">{{ event }}</p>
    </div>
  </div>
</template>

<style scoped>
.log-container {
  border: 1px dashed red;
}

label {
  border: 1px dashed green;
}

.event-list {
  border: 1px dashed yellow;
}
</style>
