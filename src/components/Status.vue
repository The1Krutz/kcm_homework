<script setup lang="ts">
import type { PrompterStatus } from './types';

defineProps<{
  status: PrompterStatus;
}>();
</script>

<template>
  <div class="status">
    <span>Status: {{ status.status }} </span>
    <span>Image: {{ status.feed }} </span>
    <span>Section: {{ status.section }} </span>
  </div>
</template>

<style scoped>
.status {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
}
</style>
