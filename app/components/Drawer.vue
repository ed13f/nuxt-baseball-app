

<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
  buttonText: string
}>()

const buttonId = computed(() =>
  props.buttonText.toLowerCase().replace(/\s+/g, '-')
)

</script>

<template>
    <div className="drawer drawer-end">
        <input :id="buttonId" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
            <label :htmlFor="buttonId" className="drawer-button btn btn-primary">{{ buttonText }}</label>
        </div>
        <div className="drawer-side">
            <label :htmlFor="buttonId" aria-label="close sidebar" className="drawer-overlay"></label>
            <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                <slot />
            </div>
        </div>
    </div>
</template>