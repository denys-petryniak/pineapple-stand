import { defineStore } from "pinia";

export const useCartStore = defineStore("CartStore", {
  state: () => ({
    items: [],
  }),

  actions: {
    addItems(count, item) {
      const itemCount = parseInt(count);

      for (let index = 0; index < itemCount; index++) {
        this.items.push({ ...item });
      }
    },
  },
});
