import { defineStore, acceptHMRUpdate } from "pinia";

export const useProductStore = defineStore("ProductStore", {
  state: () => {
    return {
      products: [],
    };
  },

  actions: {
    async fill() {
      this.products = (await import("@/data/products.json")).default;
      // this.products = await axios.get('some/end/point').data;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot));
}
