import { ProductModel } from "./productModel";

export class CartModel {

    private products: ProductModel[] = [];

    private totalPrice = 0;

    getTotalPrice() { return this.totalPrice }
    getTotalProducts() { return this.products.length; }

    addProduct(prod: ProductModel): void {

        this.products.push(prod);
        this.additionPrice(prod);
    }

    removeProduct(product: ProductModel): void {
        const i = this.products.lastIndexOf(product);
        if (i && i > -1) {
            this.products.splice(i, 1);
            this.decresePrice(product);
        }
        if (i > -1 && i < 1) {
            this.products.pop();
            this.decresePrice(product);
        }
    }

    quantitySameProduct(prod: ProductModel): number {
        return this.products.map(item => item.id).filter(prodId => prodId === prod.id).length || 0;
    }

    private decresePrice(prod: ProductModel): void {
        this.totalPrice -= prod.price;
    }

    private additionPrice(prod: ProductModel): void {
        this.totalPrice += prod.price;
    }

}