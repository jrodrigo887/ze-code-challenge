<script setup lang="ts">
    interface Props {
        categories: { id: string; title: string }[]
    }

    const { categories } = defineProps<Props>();
</script>

<template>
    <div class="categories">
        <ul>
            <li v-for="category in categories" @click.prevent="$emit('onPressed', category.id)" 
                class="product__categories__item shadow-interpolacao" >
                <p>{{ category.title }}</p>
            </li>
        </ul>
    </div>
</template>

<style>
.categories > ul {
    list-style-type: none;
    margin: 0 auto;
    padding: 0;
    padding: 6px 16px;
    display: flex;
}

ul > .product__categories__item {
    width: 8.87rem;
    height: 3rem;
    margin: 0 16px;
    padding: 4px;
    border: 1px solid var(--on-background-color);
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.product__categories__item > h4 {
    font-size: 14px;
    color: var(--on-primary)
}

.product__categories__item:hover {
    background-color: rgba(255, 255, 255, 0.425);
}
.shadow-interpolacao{
    box-shadow: 1px 4px 6px rgba(255, 255, 255, 0.425); 
}
.shadow-interpolacao:hover{
    box-shadow: 2px 2px 12px rgba(255, 255, 255, 0.425);
    -webkit-transition : box-shadow ease-out 0.6s;
    transition : box-shadow ease-out 0.6s;
    border: 1px solid var(--primary-color);
    color: var(--primary-color);    
}
</style>