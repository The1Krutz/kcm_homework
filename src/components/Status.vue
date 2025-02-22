<script setup lang="ts">
import type { PrompterStatus } from './types'

defineProps<{
  status: PrompterStatus
}>()
</script>

<template>
  <div class="greetings">Status: {{ status.status }} - {{ status.feed }}</div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
}

.greetings button {
  font-size: x-large;
}
</style>
