import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import ProductPage from '@/pages/ProductPage.vue';
import { products } from '../mock/products';

describe('ProductPage Component', () => {
    test('mount component with products', async () => {
        const wrapper = shallowMount(ProductPage, {
            global: {
                plugins: [createTestingPinia({
                    initialState: {
                        main: {
                            products
                        }
                    }
                }
                )]
            },
        });

        expect(wrapper.exists()).toBe(true);
    });
});