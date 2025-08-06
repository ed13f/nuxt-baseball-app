<script setup lang="ts">
const props = defineProps<{
  player: {
    id: number
    name: string
    age: number
    height: string
    weight: string
  }
}>()
</script>

<template>
  <div class="card-body">
    <h2 class="card-title">{{ player.name }}</h2>
    <p>Age: {{ player.age }}</p>
    <p>Height: {{ player.height }}</p>
    <p>Weight: {{ player.weight }}</p>
    <div class="card-actions justify-end">
      <slot />
    </div>
  </div>
</template>
