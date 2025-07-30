<script setup lang="ts">
import { ref, watch } from 'vue'
import { useTeamStore } from '../../../stores/team'

// Props
const props = defineProps<{
  closeModal: () => void
  editingTeam?: { id: number; name: string } | null
}>()

// Emits (optional, for parent update)
const emit = defineEmits(['updated'])

// const { createTeam } = useTeams()
const { updateTeam, createTeam } = useTeamStore()

const name = ref('')
const isEditing = ref(false)

const success = ref(false)
const error = ref<string | null>(null)

// If editingTeam is passed, populate input and switch to editing mode
watch(
  () => props.editingTeam,
  (team) => {
    if (team) {
      name.value = team.name
      isEditing.value = true
    } else {
      name.value = ''
      isEditing.value = false
    }
  },
  { immediate: true }
)

const submit = async (closeModal: () => void) => {
  error.value = null
  success.value = false
  try {
    if (isEditing.value && props.editingTeam) {
      await updateTeam(props.editingTeam.id, { name: name.value })
    } else {
      await createTeam({ name: name.value })
    }

    success.value = true
    name.value = ''
    closeModal()
    emit('updated')
  } catch (err: any) {
    error.value = err?.data?.message || 'Error saving team'
  }
}
</script>

<template>
  <!-- <Drawer :buttonText="isEditing ? 'Edit Team' : 'Add Team'" v-slot="{ closeModal }"> -->
    <div class="max-w-md mx-auto p-6 space-y-4">
      <h1 class="text-2xl font-bold">{{ isEditing ? 'Edit Team' : 'Add a Team' }}</h1>

      <input
        v-model="name"
        class="input input-bordered w-full"
        placeholder="Name"
      />

      <button @click="submit(closeModal)" class="btn btn-primary w-full">
        {{ isEditing ? 'Update' : 'Create' }} Team
      </button>

      <p v-if="success" class="text-green-600">✅ Success!</p>
      <p v-if="error" class="text-red-600">❌ {{ error }}</p>
    </div>
  <!-- </Drawer> -->
</template>
