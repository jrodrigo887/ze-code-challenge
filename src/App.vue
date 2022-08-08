<script setup lang="ts">
import Header from '@/layout/Header.vue';
import Footer from '@/layout/Footer.vue';
import Modal from '@/components/Modal.vue';
import { useStore } from './store';
import { storeToRefs } from 'pinia';

const { activeModal } = useStore();
const { openModal, titleModal, subtitleModal } = storeToRefs(useStore())

</script>
<template>
    <Modal @pressed="activeModal({ open: false })" :loading="openModal" :title="titleModal" :subtitle="subtitleModal">
    </Modal>
    <div class="app app__background__color">
        <Header />
        <main class="app__content">
            <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </main>
        <Footer>
            <h4>Desenvolvido por João Rodrigo</h4>
        </Footer>
    </div>
</template>

<style>
.app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

.app__background__color {
    background: var(--bgc-gradient);
}

.app__content {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex: 1;
    width: 100%;
    height: 100%;
    overflow: auto;
    margin: 0 auto;
    max-width: 1012px;
}

@media screen and (max-width: 768px) {
    .app__content {
        width: 100%;
    }
}
</style>