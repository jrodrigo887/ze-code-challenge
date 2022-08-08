<script setup lang="ts">
// props
interface Props {
    type: string;
}

const { type } = defineProps<Props>();

// evets
interface Emits {
    (e: 'pressed'): void
}

const emits  = defineEmits<Emits>()

</script>

<template>
    <button class="button" :class="type" @click="emits('pressed')" >
        <slot/>
    </button>
</template>

<style scoped>
.outline {
    border: 1px solid var(--primary-medium);
    color: var(--primary-medium);
    border-radius: 24px;
    background-color: transparent;
}
.outline:hover {
    background-color: var(--primary-medium);
    color: var(--on-primary);
}
</style>