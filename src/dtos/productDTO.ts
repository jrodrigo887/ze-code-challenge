export interface ProductDTO {  
    id: string;
    title: string;
    image: string;
    price: number;
    category: {
        id?: string;
        title: string;
    }
}