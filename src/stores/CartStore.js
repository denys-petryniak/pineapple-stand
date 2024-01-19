import { defineStore, acceptHMRUpdate } from "pinia";
import { groupBy } from "lodash";
import { useAuthUserStore } from "@/stores/AuthUserStore";

export const useCartStore = defineStore("CartStore", {
  historyEnabled: true,
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
    checkout() {
      const authUserStore = useAuthUserStore();
      const username = authUserStore.username;

      alert(
        `${username} just bought ${this.count} items at a total of $${this.total}`
      );
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
