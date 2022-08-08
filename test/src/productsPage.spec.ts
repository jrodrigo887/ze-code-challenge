import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import ProductPage from '@/pages/ProductPage.vue';

describe('ProductPage Component', () => {
    test('mount component', async () => {
        const wrapper = mount(ProductPage, {
            global: {
                plugins: [createTestingPinia()]
            },
        });

        expect(wrapper.exists()).toBe(true);
    });
});