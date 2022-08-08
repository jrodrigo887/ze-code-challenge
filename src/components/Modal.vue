<script setup lang="ts">
import { useModal } from '@/composable/modal';

import { ref, toRef, toRefs } from 'vue';
interface Props {
    loading: boolean;
    title?: string,
    subtitle?: string,
}

const { title, subtitle, loading } = defineProps<Props>();

interface Emits {
    (e: 'pressed'): void;
}

const emit = defineEmits<Emits>()
</script>

<template>
    <Teleport to="body">
        <div v-if="loading" class="modal" :key="title">
            <div class="modal__title">
                <h1>{{ title }}</h1>
                <p>{{ subtitle }}</p>
            </div>
            <button v-on:click="emit('pressed')">Close</button>
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--on-background-color);
}

.modal__title>h1 {
    color: var(--on-background-color);
}
</style>