import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import HomePage from '@/pages/HomePage.vue';

describe('HomePage Component', () => {
    test('mount component', async () => {
        const wrapper = shallowMount(HomePage, {
            global: {
                plugins: [createTestingPinia()]
            },
        });

        expect(wrapper.text()).toContain('Peça a mais gelada da Cidade');
    })

    test("must contain the message: 'Peça a mais gelada da Cidade'", async () => {
        const wrapper = shallowMount(HomePage);

        expect(wrapper.text()).toContain('Peça a mais gelada da Cidade');
    })
})