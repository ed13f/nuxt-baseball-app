<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  buttonText?: string
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

// Unique ID to allow multiple drawers on the same page
const buttonId = `drawer-${Math.random().toString(36).slice(2, 8)}`
const modalToggle = ref<HTMLInputElement | null>(null)

// Watch external modelValue and sync toggle checkbox
watch(
  () => props.modelValue,
  (val) => {
    if (modalToggle.value) {
      modalToggle.value.checked = val
    }
  },
  { immediate: true }
)

// Emit back to parent when checkbox is clicked manually
const onChange = () => {
  if (modalToggle.value) {
    emit('update:modelValue', modalToggle.value.checked)
  }
}

function closeModal() {
  emit('update:modelValue', false)
}
</script>

<template>
  <div class="drawer drawer-end">
    <input
      :id="buttonId"
      type="checkbox"
      class="drawer-toggle"
      ref="modalToggle"
      @change="onChange"
    />
    

    <div v-if="buttonText" class="drawer-content">
      <label :for="buttonId" class="drawer-button btn btn-primary">
        {{ buttonText }}
      </label>
    </div>

    <div class="drawer-side">
      <label :for="buttonId" class="drawer-overlay" />
      <div class="menu bg-base-200 text-base-content min-h-full w-80 p-4 pt-13 relative">
        <button
          class=" btn-sm btn-circle bg-red-600 hover:bg-red-700 text-white absolute top-2 right-2"
          @click="closeModal"
          aria-label="Close drawer"
        >
          ✕
        </button>
        <slot :closeModal="closeModal" />
      </div>
    </div>
  </div>
</template>
