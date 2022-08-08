<script setup lang="ts">
import Header from '@/layout/Header.vue';
import Footer from '@/layout/Footer.vue';

</script>

<template>
    <div class="app app__background__color">
        <Header />
        <main class="app__content">
            <router-view v-slot="{ Component }">
                <transition  name="fade" mode="out-in">
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
 }

 .app__background__color {
    background: var(--bgc-gradient);
 }

.app__content {
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