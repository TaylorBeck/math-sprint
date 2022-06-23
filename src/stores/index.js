import { defineStore } from 'pinia'

export const useStore = defineStore({
  id: 'store',
  state: () => ({
    points: 0
  }),
  getters: {
    points: (state) => state.points
  },
  actions: {
    increment() {
      this.points++;
    }
  }
})
