import { defineStore } from "pinia";
import { groupBy } from "lodash";

export const useCartStore = defineStore("CartStore", {
  state: () => ({
    items: [],
  }),

  getters: {
    count: (state) => state.items.length,
    isEmpty: (state) => state.count === 0,
    grouped: (state) => {
      return Object.fromEntries(
        Object.entries(groupBy(state.items, (item) => item.name)).sort()
      );
    },
    groupCount: (state) => (name) => state.grouped[name].length,
    total: (state) =>
      state.items.reduce((total, item) => total + item.price, 0),
  },

  actions: {
    addItems(count, item) {
      const itemCount = parseInt(count);

      for (let index = 0; index < itemCount; index++) {
        this.items.push({ ...item });
      }
    },
    clearItem(itemName) {
      this.items = this.items.filter((item) => item.name !== itemName);
    },
    setItemCount(item, count) {
      this.clearItem(item.name);
      this.addItems(count, item);
    },
  },
});
