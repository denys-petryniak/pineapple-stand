<script setup>
import { ref } from "vue";
import CartItem from "@/components/CartItem.vue";
import { useCartStore } from "@/stores/CartStore";

const cartStore = useCartStore();
const active = ref(false);

const resetCartStore = () => {
  // cartStore.$reset() - does not work because of persisted state
  cartStore.$patch((state) => {
    state.items = [];
  });
};
</script>

<template>
  <div class="relative">
    <!-- Icon that always shows -->
    <span class="cursor-pointer" @click="active = true">
      <Fa icon="shopping-cart" size="lg" class="text-gray-700" />
      <div class="cart-count absolute">{{ cartStore.count }}</div>
    </span>
    <!-- Modal Overlay only shows when cart is clicked on -->
    <AppModalOverlay :active="active" @close="active = false">
      <div v-if="!cartStore.isEmpty">
        <ul class="items-in-cart">
          <CartItem
            v-for="(items, name) in cartStore.grouped"
            :key="name"
            :product="items[0]"
            :count="cartStore.groupCount(name)"
            @updateCount="cartStore.setItemCount(items[0], $event)"
            @clear="cartStore.clearItem(name)"
          />
        </ul>
        <div class="flex justify-end text-2xl mb-5">
          Total: <strong class="ml-2">${{ cartStore.total }}</strong>
        </div>
        <div class="flex justify-end">
          <AppButton class="secondary mr-2" @click="resetCartStore">
            Clear Cart
          </AppButton>
          <AppButton class="primary" @click="cartStore.checkout"
            >Checkout</AppButton
          >
        </div>
      </div>
      <div v-else><em>Cart is Empty</em></div>
    </AppModalOverlay>
  </div>
</template>
<style lang="pcss" scoped>
.items-in-cart{
  @apply mb-5;
}

.items-in-cart li{
  @apply flex justify-between p-2;
}

.items-in-cart li:nth-of-type(even){
  @apply bg-gray-300;
}
</style>
