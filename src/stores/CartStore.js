import { defineStore } from "pinia";

export const useCartStore = defineStore("CartStore", {
  state: () => ({
    items: [],
  }),

  getters: {
    count: (state) => state.items.length,
    isEmpty: (state) => state.count === 0,
  },

  actions: {
    addItems(count, item) {
      const itemCount = parseInt(count);

      for (let index = 0; index < itemCount; index++) {
        this.items.push({ ...item });
      }
    },
  },
});
