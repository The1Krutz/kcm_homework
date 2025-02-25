<script setup lang="ts">
import type { PrompterStatus } from './types';

defineProps<{
  status: PrompterStatus;
}>();
</script>

<template>
  <div class="status">Status: {{ status.status }} - {{ status.feed }} ({{ status.section }})</div>
</template>

<style scoped>
.status {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
}
</style>
