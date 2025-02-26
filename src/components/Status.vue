<script setup lang="ts">
import type { PrompterStatus } from './types';

defineProps<{
  status: PrompterStatus;
}>();
</script>

<template>
  <div class="status">
    <span>Status: {{ status.status }} </span>
    <span>Display: {{ status.display }} </span>
    <span>Section: {{ status.section }} </span>
  </div>
</template>

<style scoped>
.status {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
