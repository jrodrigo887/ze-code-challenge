<script setup lang="ts">
import { ProductModel } from '@/models/productModel.js';
import { useStore } from '@/store';
import { storeToRefs } from 'pinia';

const { cartModel } = storeToRefs(useStore());

interface Props {
    products: ProductModel[] | null;
}

const { products } = defineProps<Props>();

interface Emits {
    (e: 'addProduct', product: any): void;
    (e: 'removeProduct', product: any): void;
}

const emit = defineEmits<Emits>();

</script>
<template>
    <div v-for="product in products" :key="product.id" class="card">
        <div class="card__content">
            <div class="card__image">
                <img :src="product.image" :alt="product.title">
            </div>
            <div class="card__section">
                <p class="card__section__title">{{ product.title }}</p>
                <span v-currency="product.price" class="card__section__price"></span>
            </div>
            <div class="card__button">
                <button @click.stop="emit('removeProduct', product)">-</button>
                    <transition name="slider" mode="out-in">
                        <p>{{ cartModel?.quantitySameProduct(product) }}</p>
                    </transition>
                <button @click.stop="emit('addProduct', product)">+</button>
            </div>
        </div>
    </div>
</template>

<style>
.card {
    cursor: pointer;
    margin: 6px;
    display: flex;
    flex-wrap: wrap;
    border-radius: 8px;
}

.card__content {
    position: relative;
    min-width: 181px;
    width: 181px;
    height: 208px;
    /* background: #ffffff; */
    
    border-radius: 8px;
    border: 1px solid #fafafa;
    box-shadow: rgb(0 0 0 / 8%) 0px 2px 4px 0px;
    cursor: point;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
}

.card__brand__selected {
    position: absolute;
    top: 4px;
    right: 0px;
    display: flex;
    width: 64px;
    height: 22px;
    font-size: 12px;
    line-height: 24px;
    border-radius: 25px;
    background-color: #fff;
}

.card__brand__selected > p {
    position: relative;
    right: -4px;
}

.card__brand--quantity {
    display: inline-block;
    flex-shrink: 0;
    width: 22px;
    height: 22px;
    border-radius: 25px;
    background-color: var(--primary-color);
    text-align: center;
}

img {
    height: 50%;
    width: 118px;
    padding: 8px;
}

.card__image {
    display: flex;
    justify-content: center;
}

.card__section {
    padding: 4px;
    height: 42%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
}

.card__section__title {
    margin-left: 4px;
    font-size: 14px;
}

.card__section__price {
    margin-left: 8px;
    font-size: 12px;
    font-weight: 600;
}

.card__button {
    display: flex;
    position: absolute;
    right: 1px;
    bottom: 1px;
    padding: 4px;
    cursor: pointer;
    border: none;
    outline: none;
    border-radius: 8px;
    color: var(--on-brackground-color);
    background-color: var(--secondary-color);

}

.card__button > p {
  width: 30px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: var(--primary-color);
}

.card__button > button {
    font-size: 16px;
    cursor: pointer;
    border: none;
    outline: none;
    padding: 2px 6px;
    font-weight: 600;
    color: var(--on-brackground-color);
    background-color: transparent;
}

.card:hover {
    box-sizing: border-box;
    background: rgba(110, 109, 109, 0.13);
    border: 0.6px solid var(--primary-color);
}

.card__button button:hover:first-child {
    cursor: pointer;
    border: 0.8px solid var(--primary-color);
    background-color: var(--primary-color);
    color: #fff;
    border-end-start-radius: 8px;
    border-top-left-radius: 8px;
}

.card__button button:hover:last-child {
    cursor: pointer;
    border: 0.8px solid var(--primary-color);
    background-color: var(--primary-color);
    color: #fff;
    border-top-right-radius: 8px;
    border-end-end-radius: 8px;
}

</style>
