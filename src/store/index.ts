import { ProductDTO } from '@/dtos/productDTO';
import { defineStore } from 'pinia';
import { GraphqlQueriesService } from '@/service/graphqlQueriesService';
import { useQuery } from '@vue/apollo-composable'
import { ProductModel } from '@/models/productModel';
import { router } from '@/router';
import { CartModel } from '@/models/cartModel';

interface State {
    products: ProductModel[];
    cart: ProductModel[];
    cartModel: CartModel | null;
    andress: string,
    pocId: any;
    geocoder: {
        lat: string;
        lng: string;
    } | null;
    totalPrice: number;
    loading: boolean;
}

const stateInitial = {
    products: [],
    cart: [],
    cartModel: new CartModel(),
    andress: '',
    pocId: '',
    geocoder: null,
    totalPrice: 0,
    loading: false
}

export const useStore = defineStore('main', {
    state: (): State => (stateInitial),
    getters: {
        getProducts: (state) => state.products,
        getPocId(state) { 
            return state.pocId; 
        },
        getCartTotalPrice() {
            this.cartModel?.getTotalPrice();
        }
    },
    actions: {
        searchAddress(parameter: { pocSearchLat: string; pocSearchLong: string; address?: string }) {
            const { onResult, loading } = useQuery(GraphqlQueriesService.searchEstablishment, parameter);
            this.loading = loading.value;
            let response: any;

            onResult(resp => {
                response = resp.data.pocSearch[0] ?? [];

                this.setAddress(parameter.address);
                this.setPocId(response?.id);
                this.setCoords({ lat: parameter.pocSearchLat, lng: parameter.pocSearchLong });

                this.searchProducts({ pocId: response.id })
                
                this.loading = resp.loading;

                if (resp.error) {
                    throw new Error('Não foi possível localizar o endereço');
                }
            });
        },
        searchProducts(parameter: {pocId: string; productsSerach?: string; productsCategoryId?: string; }) {
            if (!parameter.pocId) {
                throw new Error('Sem Identificador do estabelecimento.');
            } 

            const { onResult, loading } = useQuery(GraphqlQueriesService.allProduct, parameter);

            this.loading = loading.value;
            let response: any;


            onResult(result => {
                response = result.data.poc?.products ?? [] as ProductDTO[];

                this.setProducts(response);

                if (result.error) {
                    throw new Error('Não foi possível encontrar os produtos');
                }

                router.push({ name: 'products'})

            });
        },
        setProducts(products: ProductDTO[]) {
            products.forEach(pd => {
                this.products.push(ProductModel.fromProductModel(pd))
            });
        },
        setAddress(andress?: string) {
            this.andress = andress ?? '';
        },
        setPocId(pocId: string): void {
            this.pocId = pocId;
        },
        setCoords(geocoder: { lat: string; lng: string; } | null): void {
            this.geocoder = geocoder;
        },
        addProductToCart(product: ProductModel) {
            this.totalPrice += product.price
            this.cart.push(product);
            this.cartModel?.addProduct(product);
            
        },
        removeProductFromCart(product: ProductModel) {
            this.cartModel?.removeProduct(product);
        },
        removeAddress() {
            this.andress = '';
            this.geocoder = null;
            this.pocId = '';
            this.removeCart();
        }, 
        removeCart() {
            this.cart = [];
            this.cartModel = null;
        }
    }
});