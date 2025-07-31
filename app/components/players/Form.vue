<!-- <script setup lang="ts">
    import { ref } from 'vue'
    import { $fetch } from 'ofetch'

    const name = ref('')
    const email = ref('')
    const age = ref<number | null>(null)
    const height = ref('')
    const weight = ref('')

    const success = ref(false)
    const error = ref<string | null>(null)

    const submit = async () => {
        error.value = null
        success.value = false
        
        try {
            await $fetch('/api/players/create', {
            method: 'POST',
            body: {
                name: name.value,
                email: email.value,
                age: age.value,
                height: height.value,
                weight: weight.value,
            },
            })
            success.value = true
            
            name.value = ''
            email.value = ''
            age.value = null
            height.value = ''
            weight.value = ''
        } catch (err: any) {
            error.value = err?.data?.message || 'Error adding user'
        }
    }
</script>

<template>
  <div class="max-w-md mx-auto p-6 space-y-4">
    <h1 class="text-2xl font-bold">Add a Player Profile</h1>
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

    <button @click="submit" class="btn btn-primary w-full">Add Player</button>

    <p v-if="success" class="text-green-600">✅ Player added!</p>
    <p v-if="error" class="text-red-600">❌ {{ error }}</p>
  </div>
</template> -->


<script setup lang="ts">
import { ref, watch } from 'vue'
import { usePlayerStore } from '../../../stores/player'

// Props
const props = defineProps<{
  closeModal: () => void
  editingPlayer?: { id: number; name: string; email: string; age: number; height: string; weight: string } | null
}>()

// Emits (optional, for parent update)
const emit = defineEmits(['updated'])

const { updatePlayer, createPlayer } = usePlayerStore()

const name = ref('')
const email = ref('')
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
      age.value = player.age
      height.value = player.height
      weight.value = player.weight
      isEditing.value = true
    } else {
      name.value = ''
      email.value = ''
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
     const player =  await updatePlayer(props.editingPlayer.id, { 
      name: name.value, 
      email: email.value,
      age: age.value,
      height: height.value, 
      weight: weight.value 
    })

     console.log('playerrrrr: ', player);
    } else {
      await createPlayer({ 
        name: name.value, 
        email: email.value, 
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
</script>

<template>
  <!-- <Drawer :buttonText="isEditing ? 'Edit player' : 'Add player'" v-slot="{ closeModal }"> -->
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
  <!-- </Drawer> -->
</template>

