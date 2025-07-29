<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  buttonText: string
}>()

const drawerToggle = ref(null)

if (drawerToggle.value) {
    drawerToggle.value.checked = false
}

</script>

<template>
    <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
            <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">{{ buttonText }}</label>
        </div>
        <div className="drawer-side">
            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
            <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                <slot />
            </div>
        </div>
    </div>
</template>