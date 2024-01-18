<script setup>
import { ref, reactive } from "vue";
import { useProductStore } from "@/stores/ProductStore";
import { useCartStore } from "@/stores/CartStore";
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";

const productStore = useProductStore();
productStore.fill();

const cartStore = useCartStore();

const history = reactive([]);
const doingHistory = ref(false);

history.push(JSON.stringify(cartStore.$state));

const undo = () => {
  if (history.length === 1) return;

  doingHistory.value = true;
  history.pop();
  cartStore.$state = JSON.parse(history.at(-1));
  doingHistory.value = false;
};

cartStore.$subscribe((_, state) => {
  if (!doingHistory.value) {
    history.push(JSON.stringify(state));
  }
});

cartStore.$onAction(({ name, args, after, onError }) => {
  if (name === "addItems") {
    after(() => console.log(`Added ${args[0]} items to cart`));
    onError((error) =>
      console.log(`Failed to add items to cart: ${error.message}`)
    );
  }
});
</script>

<template>
  <div class="container">
    <TheHeader />
    <div class="flex justify-end mb-5">
      <AppButton
        :disabled="history.length === 1"
        :class="{ 'cursor-not-allowed': history.length === 1 }"
        @click="undo"
        >Undo</AppButton
      >
    </div>
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard
        v-for="product in productStore.products"
        :key="product.name"
        :product="product"
        @addToCart="(count) => cartStore.addItems(count, product)"
      />
    </ul>
  </div>
</template>
