import { createApp, DirectiveBinding } from 'vue';
import './assets/style.css';
import './assets/components.css';
import App from './App.vue';
import { router } from './router';
import { apolloClient } from './plugin/apollo/client'
import { provideApolloClient } from "@vue/apollo-composable";
import { createPinia } from 'pinia'

provideApolloClient(apolloClient)
const pinia = createPinia();
const app = createApp(App)
app.use(router)
app.use(pinia)

app.directive('currency', (el: HTMLElement, binding: DirectiveBinding<string | number>) => {
    let value = binding.value;

    const customFormatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
    });
   
    if (typeof value !== 'number') {
        value = Number(value);
    }
    
    el.textContent = customFormatter.format(value);
});

app.mount('#app')
