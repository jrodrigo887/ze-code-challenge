import { useStore } from '@/store';
import { setActivePinia, createPinia } from 'pinia';
import { products }  from '../mock/products';


describe('Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('Add one product in store', () => {
        const store = useStore();

        store.setProducts([products[0]]);

        expect(store.products.length).toBe(1)
    });

    it('Add a product in the cart', () => {
        const store = useStore();

        const identifier = store.products[0];

        store.cartModel?.addProduct(identifier);

        expect(store.cartModel?.getTotalProducts()).toBe(1)
        
    });

    it('Remove a product in the cart', () => {
        const store = useStore();

        const identifier = store.products[0];

        expect(store.cartModel?.getTotalProducts()).toBe(1);
        
        store.cartModel?.removeProduct(identifier);
        
        expect(store.cartModel?.getTotalProducts()).toBe(0);
    });


})