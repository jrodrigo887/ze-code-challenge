<script setup lang="ts">
import SerachAndress from '@/components/searchAndress/SearchAndress.vue';
import { SearchAddressDTO } from '@/dtos/searchAndressDTO.js';
import { useStore } from '@/store'
import { onMounted } from 'vue';
const classe = document.getElementsByClassName('app').item(0);

const { searchAddress } = useStore();

function handleAndress(event: SearchAddressDTO) {
    if (!event) return;
    searchAddress(event);
}

onMounted(() => classe && classe.classList.add('app__background__color'));
</script>

<template>
    <div class="home">
        <div class="home__ilustration">
            <a href="https://www.designi.com.br/c09cbfa3ebefea0c" target="_blank" rel="noopener noreferrer">
                <img class="home__image" src="../assets/images/vai-uma-cerveja.jpg"
                    alt="Vai uma cervejinha com seu velho?">
            </a>
        </div>

        <div class="home__searchandress">
            <h2 class="home__searchandress__title">Peça a mais gelada da Cidade</h2>
            <SerachAndress @search-andress="handleAndress" placeholder="Inserir enderço para ver preço"></SerachAndress>
        </div>
    </div>
</template>

<style scoped>
.home {
    min-height: calc(100vh - 150px);
    display: grid;
    grid-template-areas:
        "ilustration search_andress"
    ;
    grid-template-rows: 1fr;
    justify-content: space-evenly;
    justify-items: center;
    align-content: center;
}

.home__ilustration {
    grid-area: ilustration;
    align-self: center;
}

.home__ilustration>a>.home__image {
    width: 100%;
    height: 400px;
    margin: 16px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    border: 3.5px dotted var(--secondary-color);
}

.home__searchandress {
    grid-area: search_andress;
    align-self: center;
}

.home__searchandress__title {
    padding: 12px 16px;
    color: var(--on-primary);

}


@media screen and (max-width: 471px) {
    .home {
        grid-template-areas:
            "search_andress"
            "ilustration"
        ;
    }

    .home__ilustration {
        display: none;
    }
}
</style>