export const useFieldPositionsStore = defineStore('fieldPositions', {
    state: () => ({
      positions: [] as { id: number; name: string }[],
    }),
    actions: {
      async fetchPositions() {
        this.positions = await $fetch('/api/field-positions/all')
        return this.positions
      },
    },
  })
  