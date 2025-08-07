<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '../../../stores/game'
import { useTeamStore } from '../../../stores/team'

const props = defineProps<{
  closeModal: () => void
  editingGame?: {
    id: number
    date: number
    homeTeamId: number
    awayTeamId: number
    location: string
  } | null
}>()

const emit = defineEmits(['updated'])

const { createGame, updateGame } = useGameStore()
const { getAllTeams } = useTeamStore()
const router = useRouter()

const teams = ref<{ id: number; name: string }[]>([])

const isEditing = ref(false)

const date = ref('')
const homeTeamId = ref<number | null>(null)
const awayTeamId = ref<number | null>(null)
const location = ref('')

const success = ref(false)
const error = ref<string | null>(null)

watch(
  () => props.editingGame,
  (game) => {
    if (game) {
      isEditing.value = true
      date.value = new Date(game.date).toISOString().substring(0, 10)
      homeTeamId.value = game.homeTeamId
      awayTeamId.value = game.awayTeamId
      location.value = game.location
    } else {
      isEditing.value = false
      date.value = ''
      homeTeamId.value = null
      awayTeamId.value = null
      location.value = ''
    }
  },
  { immediate: true }
)

onMounted(async () => {
  teams.value = await getAllTeams()
})

const submit = async (closeModal: () => void) => {
  error.value = null
  success.value = false
  const dateInput = Date.parse(date.value)

  try {
    const payload = {
      date: dateInput,
      homeTeamId: homeTeamId.value!,
      awayTeamId: awayTeamId.value!,
      location: location.value,
    }
    let newGame:any = null

    if (isEditing.value && props.editingGame) {
      await updateGame(props.editingGame.id, payload)
    } else {
      newGame = await createGame(payload)
    }

    success.value = true
    closeModal()
    emit('updated')
    // router.push(`/games/${newGame.id}`)
  } catch (err: any) {
    error.value = err?.data?.message || 'Error saving game'
  }
}
</script>

<template>
  <div class="max-w-md mx-auto p-6 space-y-4">
    <h1 class="text-2xl font-bold">{{ isEditing ? 'Edit Game' : 'Add Game' }}</h1>

    <input type="date" v-model="date" class="input input-bordered w-full" />

    <select v-model="homeTeamId" class="select select-bordered w-full">
      <option disabled value="">Select Home Team</option>
      <option v-for="team in teams" :key="team.id" :value="team.id">{{ team.name }}</option>
    </select>

    <select v-model="awayTeamId" class="select select-bordered w-full">
      <option disabled value="">Select Away Team</option>
      <option v-for="team in teams" :key="team.id" :value="team.id">{{ team.name }}</option>
    </select>

    <input
      v-model="location"
      class="input input-bordered w-full"
      placeholder="Location"
    />

    <button @click="submit(closeModal)" class="btn btn-primary w-full">
      {{ isEditing ? 'Update' : 'Create' }} Game
    </button>

    <p v-if="success" class="text-green-600">✅ Success!</p>
    <p v-if="error" class="text-red-600">❌ {{ error }}</p>
  </div>
</template>
