<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from '@/store';
import { storeToRefs } from 'pinia';
import ProductCard from '../components/ProductCard.vue';
import CategoryList from '@/components/CategoryList.vue';
import { useRouter } from 'vue-router';
const classe = document.getElementsByClassName('app').item(0);

const { products } = storeToRefs(useStore());
const { addProductToCart, removeProductFromCart } = useStore();

const router = useRouter();

function selectCategory(categoryId: string) {
    console.log(categoryId);
}

const categories:{id:string; title: string;}[]  = [
    {
        id: '123',
        title: 'Vinho'
    },
    {
        id: '234',
        title: 'Alcool'
    },
    {
        id: '345',
        title: 'Agua'
    },
]

function loadData() {
    classe && classe.classList.remove('app__background__color');

    if((products.value.length <= 0)) {
        router.replace({ name: 'home' });
    }
}

onMounted(() => loadData());
</script>
<template>
    <div class="product">
        <!-- Category -->
        <section class="product__categories">
            <CategoryList :categories="categories" @onPressed="selectCategory"></CategoryList>
        </section>

        <!-- Lista de cards -->
        <div class="product__cards">
            <ProductCard @add-product="addProductToCart" @remove-product="removeProductFromCart" :products="products"></ProductCard>
        </div>
    </div>
</template>
<style scoped>
.product {
    width: 100%;
    height: 100%;
}

.product__categories {
    margin: 12px 0;
    padding: 6px 16px;
}
.product__cards {
    display: flex;
    flex-wrap: wrap;
    padding: 0 16px;
}

@media screen and (max-width: 414px) {
    .product__cards {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
}

</style>