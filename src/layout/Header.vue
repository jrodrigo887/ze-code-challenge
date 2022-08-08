<script setup lang="ts">
import Button from "@/components/Button.vue";

import logoZe from '@/assets/images/zedelivery-logo.png';
import smallLogoZe from '@/assets/images/small-logo.png';

import Cart from "@/components/Cart.vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";

const { andress } = storeToRefs(useStore())


</script>

<template>
  <nav class="header">
    <div class="header__content">
      <transition>
        <div class="header__content__address">
          <figure>
            <img v-if="!andress" width="121" height="40" :src="logoZe" alt="Logo Zé Delivery." />
            <img v-else class="header__content__address--img" :src="smallLogoZe" alt="Logo Zé Delivery." />
          </figure>
          <p v-if="andress">
            Receba agora em <br />
          <p class="header__content__andress__text"> {{ andress }} </p>
          </p>
        </div>
      </transition>
      <menu>
        <Button v-if="!andress" class="header__button" type="outline">
          Login
        </Button>
        <Cart v-else />
      </menu>
    </div>
  </nav>
</template>

<style scoped>
img {
  display: inline-block;
}

.header {
  display: flex;
  justify-content: center;
  height: 4.5rem;
  background: var(--on-primary);
}

.header__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 5px;
}

.header__content__address {
  display: flex;
  align-items: center;
  width: 30%;
  font-size: 12px;
  line-height: 16px;
  color: var(--background-color);
}

.header__content__andress__text {
  width: 60%;
  font-size: 13px;
  color: var(--primary-color);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.header__content__address--img {
  width: 80px;
  height: 80px;
  padding: 16px;
}

.header__button {
  height: 48px;
  width: 78px;
}

@media (min-width: 1199px) {
  .header__content {
    width: 80%;
  }
}
</style>
