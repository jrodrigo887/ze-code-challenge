import { ProductDTO } from "../dtos/productDTO";

export class ProductModel {
    title: string;
    id: string;
    image: string;
    price: number;
    category: string;
    idCategory?: string;
    private static totalPrice: number;

    constructor(title: string, id: string, image: string, price: number, category: string, idCategory?: string) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.price = price;
        this.category = category;
        this.idCategory = idCategory;
    }

    static fromProductModel(product: ProductDTO): ProductModel {
        return new ProductModel(
            product.title, 
            product.id, 
            product.image, 
            product.price, 
            product.category.title,
            product.category.id);
    }

    toObject(product: ProductModel): ProductDTO {
        return {
            id: product.id,
            category: {
                id: product.idCategory,
                title: product.category,
            },
            image: product.image,
            price: product.price,
            title: product.title
        }
    }

    serialize() {
        return JSON.stringify(this.toObject(this))
    }

    static fromSerielized(serialized: string) {
        const prod: ReturnType<ProductModel["toObject"]> = JSON.parse(serialized);
        return new ProductModel(prod.title, prod.id, prod.image, prod.price, prod.category.title, prod.category.id);
    }

    get totalPrice() { return ProductModel.totalPrice }
    
    static decreasePrice(prod: ProductModel) {
        ProductModel.totalPrice -= prod.price;
    }

}