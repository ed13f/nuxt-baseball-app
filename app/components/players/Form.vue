<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { $fetch } from 'ofetch'
import { usePlayerStore } from '../../../stores/player'

// Props
const props = defineProps<{
  closeModal: () => void
  editingPlayer?: { id: number; name: string; email: string; primaryPositionId: number | null, age: number; height: string; weight: string } | null
}>()

// Emits (optional, for parent update)
const emit = defineEmits(['updated'])

const { updatePlayer, createPlayer } = usePlayerStore()

const name = ref('')
const email = ref('')
const positions = ref<{ id: number; name: string }[]>([])
const primaryPositionId = ref<number | null>(null)
const age = ref<number | null>(null)
const height = ref('')
const weight = ref('')
const isEditing = ref(false)


const success = ref(false)
const error = ref<string | null>(null)

// If editingPlayer is passed, populate input and switch to editing mode
watch(
  () => props.editingPlayer,
  (player) => {
    if (player) {
      name.value = player.name
      email.value = player.email
      primaryPositionId.value = player.primaryPositionId
      age.value = player.age
      height.value = player.height
      weight.value = player.weight
      isEditing.value = true
    } else {
      name.value = ''
      email.value = ''
      primaryPositionId.value = null
      age.value = 0
      height.value = ''
      weight.value = ''
      isEditing.value = false
    }
  },
  { immediate: true }
)

const submit = async (closeModal: () => void) => {
  error.value = null
  success.value = false
  try {
    if (isEditing.value && props.editingPlayer) {
     await updatePlayer(props.editingPlayer.id, { 
      name: name.value, 
      email: email.value,
      // @ts-ignore
      primaryPositionId: primaryPositionId.value,
      age: age.value,
      height: height.value, 
      weight: weight.value 
    })

    } else {
      await createPlayer({ 
        name: name.value, 
        email: email.value, 
        primaryPositionId: primaryPositionId.value,
        age: age.value, 
        height: height.value, 
        weight: weight.value 
      })
    }

    success.value = true
    name.value = ''
    closeModal()
    emit('updated')
  } catch (err: any) {
    error.value = err?.data?.message || 'Error saving player?'
  }
}

onMounted(async () => {
  try {
    positions.value = await $fetch('/api/field-positions/all')
  } catch (err) {
    console.error('Failed to fetch field positions:', err)
  }
})

</script>

<template>
    <div class="max-w-md mx-auto p-6 space-y-4">
      <h1 class="text-2xl font-bold">{{ isEditing ? 'Edit player' : 'Add a player' }}</h1>
      <input
        v-model="name"
        class="input input-bordered w-full"
        placeholder="Name"
      />
      <input
        v-model="email"
        class="input input-bordered w-full"
        placeholder="Email"
      />
      <select v-model="primaryPositionId" class="select select-bordered w-full">
        <option disabled value="">Select a position</option>
        <option v-for="pos in positions" :key="pos.id" :value="pos.id">
          {{ pos.name }}
        </option>
      </select>
      <input
        v-model="age"
        type="number"
        class="input input-bordered w-full"
        placeholder="Age"
      />
      <input
        v-model="height"
        class="input input-bordered w-full"
        placeholder="Height"
      />
      <input
        v-model="weight"
        class="input input-bordered w-full"
        placeholder="Weight"
      />

      <button @click="submit(closeModal)" class="btn btn-primary w-full">
        {{ isEditing ? 'Update' : 'Create' }} Player
      </button>

      <p v-if="success" class="text-green-600">✅ Success!</p>
      <p v-if="error" class="text-red-600">❌ {{ error }}</p>
    </div>
</template>

