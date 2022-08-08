<script setup lang="ts">
import shoppingCart from '@/assets/images/shopping-cart.png';
import { useStore } from '@/store';
import { storeToRefs } from 'pinia';
const { cartModel } = storeToRefs(useStore());

</script>
<template>
    <section class="cart">
        <transition name="slide-fade" mode="out-in">
            <small>
                {{ cartModel?.getTotalProducts() }}
            </small>
        </transition>
        <transition name="slide-fade" mode="out-in">
            <div class="cart__content" :key="cartModel?.getTotalPrice()">
                <p v-currency="cartModel?.getTotalPrice()" class="cart__price"></p>
            </div>
        </transition>
        <div class="cart__image">
            <img :src="shoppingCart" alt="carrinho de compras">
        </div>
    </section>
</template>
<style>
.cart {
    position: relative;
    color: #fff;
}

.cart__image {
    position: relative;
    width: 56px;
    height: 56px;
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    padding: 16px;
    background-color: #fff;
    cursor: pointer;
}

.cart__image>img {
    width: 48px;
    height: 48px;
    color: #fff;
}

.cart__content {
    position: absolute;
    z-index: 3;
    bottom: -2px;
    left: -40px;
    background: var(--primary-color);
    border-radius: 12px;
    user-select: none;
}

.cart>small {
    position: absolute;
    z-index: 3;
    flex-shrink: 0;
    top: -4px;
    right: -1px;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    color: var(--on-primary);
    background: var(--primary-color);
    border-radius: 50%;
}

.cart__price {
    font-size: 12px;
    padding: 4px;
    color: var(--on-primary);

}
</style>