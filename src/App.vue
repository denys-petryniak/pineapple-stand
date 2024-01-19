<script setup>
import { useProductStore } from "@/stores/ProductStore";
import { useCartStore } from "@/stores/CartStore";
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";

const productStore = useProductStore();
productStore.fill();

const cartStore = useCartStore();

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
      <AppButton @click="cartStore.undo"> Undo </AppButton>
      <AppButton class="ml-2" @click="cartStore.redo"> Redo </AppButton>
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
