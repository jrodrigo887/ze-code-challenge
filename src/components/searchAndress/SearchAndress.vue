
<script setup lang="ts">
import { SearchAddressDTO } from '@/dtos/searchAndressDTO';
import { computed } from '@vue/reactivity';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useGooglePlaceApi } from '.';
    // refs
    const seachAndress = ref<HTMLInputElement | null>(null)

    const  { startAutoComplete, geoCode, clearGeoData } = useGooglePlaceApi();

    // === props
    interface Props {
        placeholder: string;
    }

    const { placeholder } = defineProps<Props>();

    // === emits
    interface Emits {
        (e: 'searchAndress', parameter: SearchAddressDTO ): void;
        (e: 'onBlur'): void;
    }
    const emit = defineEmits<Emits>()

    
    const geoData = computed(() => geoCode)

    function loadDataGooglePlaceAPI() {
        startAutoComplete(seachAndress);
    }
   
    function clearData() {
        emit('onBlur');
    }

    watch(() => geoCode, () => {
        emit('searchAndress', geoData.value);
    }, { deep: true })

    onMounted(() => loadDataGooglePlaceAPI());
    onBeforeUnmount(() => clearData());
</script>

<template>
    <div class="search__andress">
        <input type="text" ref="seachAndress" 
            name="pesquisar endereço"
            @blur="clearData"
            :placeholder="placeholder" />
    </div>
</template>

<style >
.search__andress {
    height: 100%;
    min-width: 280px;
    max-width: 456px;
}
input {
    width: 100%;
    border: 1px solid #999;
    height: 48px;
    border-radius: 10px;
    padding: 0 16px;
    font-size: 12px;
}

input:focus {
    border: 2.4px solid #999;
    outline: none;
    background-color: var(--secondary-color);
}

input:disabled {
    border: 2.6px solid #999;
    outline: none;
    background-color: var(--secondary-color);
}

.searchLocal {
    background-color: white;
    border: none;
    height: 48px;
    border-radius: 10px;
}
</style>