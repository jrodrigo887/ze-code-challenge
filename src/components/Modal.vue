<script setup lang="ts">
import { ref } from 'vue';
    interface Props {
        loading: boolean;
        title: string,
        subtitle: string,
    }

    let openModal = ref(false);

    const { title, subtitle, loading } = defineProps<Props>();

</script>

<template>
    <Teleport to="body">
        <div v-if="loading" class="modal">
            <h1 class="modal__title">Carrengando...</h1>
            <small></small>
            <button v-on:click="openModal = false">close</button>
        </div>
    </Teleport>
</template>

<style>
.modal {
    position: fixed;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    z-index: 999;
    background-color: #fff;
}
.modal button {
    position: absolute;
    padding: 16px;
    outline: none;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    background-color: var(--primary-color);
    color: var(--on-background-color);
    bottom: 16px;
    right: 16px;
}
.modal__title {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--on-background-color);
}
</style>