import { defineStore } from "pinia";
import { groupBy } from "lodash";

export const useCartStore = defineStore("CartStore", {
  state: () => ({
    items: [],
  }),

  getters: {
    count: (state) => state.items.length,
    isEmpty: (state) => state.count === 0,
    grouped: (state) => groupBy(state.items, (item) => item.name),
    groupCount: (state) => (name) => state.grouped[name].length,
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
