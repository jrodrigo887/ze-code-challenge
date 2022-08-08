import { ProductDTO } from '@/dtos/productDTO';
import { defineStore } from 'pinia';
import { GraphqlQueriesService } from '@/service/graphqlQueriesService';
import { useQuery } from '@vue/apollo-composable'
import { ProductModel } from '@/models/productModel';
import { router } from '@/router';
import { CartModel } from '@/models/cartModel';

interface State {
    products: ProductModel[];
    cartModel: CartModel | null;
    andress: string,
    pocId: any;
    geocoder: {
        lat: string;
        lng: string;
    } | null;
    loading: boolean;
    openModal: boolean;
    titleModal?: string;
    subtitleModal?: string;
}

const stateInitial = {
    products: [],
    cartModel: new CartModel(),
    andress: '',
    pocId: '',
    geocoder: null,
    loading: false,
    openModal: false,
    titleModal: '',
    subtitleModal: '',
}

export const useStore = defineStore('main', {
    state: (): State => (stateInitial),
    getters: {
        getProducts: (state) => state.products,
        getPocId: (state) => state.pocId,
    },
    actions: {
        searchAddress(parameter: { pocSearchLat: string; pocSearchLong: string; address?: string }) {
            const { onResult, loading } = useQuery(GraphqlQueriesService.searchEstablishment, parameter);

            this.activeModal({
                open: loading.value,
                title: 'Pesquisando...',
                subtitle: 'Estamos pesquisando o estabelecimento mais próximo!'
            })

            let response: any;

            onResult(resp => {
                response = resp.data?.pocSearch[0] || [];

                if (resp.error) {
                    this.activeModal({
                        open: loading.value,
                        title: 'Ops...',
                        subtitle: 'Não foi possível localizar o endereço \ntente novamente ou um novo endereço.'
                    })

                    throw new Error('Não foi possível localizar o endereço');
                }


                this.setCoords({ lat: parameter.pocSearchLat, lng: parameter.pocSearchLong });
                this.searchProducts({ pocId: response.id }, parameter.address)

                this.loading = resp.loading;
            });
        },
        searchProducts(parameter: { pocId: string; productsSerach?: string; productsCategoryId?: string; }, address?: string) {

            if (!parameter.pocId) {
                this.activeModal({
                    open: true,
                    title: 'Não encontramos nada nesse endereço.',
                    subtitle: 'Tente novamente ou informe um novo endereço.'
                });
                return;
                // throw new Error('Sem Identificador do estabelecimento.');
            }

            const { onResult, loading } = useQuery(GraphqlQueriesService.allProduct, parameter);
            let response: any;

            this.activeModal({
                open: loading.value,
                title: 'Carregando...',
                subtitle: '',
            });

            onResult(result => {
                response = result.data.poc?.products ?? [] as ProductDTO[];

                if (result.error) {
                    this.activeModal({
                        open: true,
                        title: 'Não foi possível encontrar os produtos',
                        subtitle: ''
                    });

                    throw new Error('Não foi possível encontrar os produtos');
                }

                this.setProducts(response);
                this.setAddress(address);
                this.setPocId(parameter.pocId);

                router.push({ name: 'products' })

            });
        },
        setProducts(products: ProductDTO[]) {
            products.forEach(pd => {
                this.products.push(ProductModel.fromProductModel(pd))
            });
            this.activeModal({ open: false, title: '', subtitle: '' });
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
            this.cartModel = null;
        },
        activeModal(modal: { open: boolean, title?: string, subtitle?: string }) {
            this.openModal = modal.open;
            this.titleModal = modal.title ?? '';
            this.subtitleModal = modal.subtitle ?? '';
        }
    }
});