import { gql } from '@apollo/client';

export class GraphqlQueriesService {
    static readonly searchEstablishment = gql`
    query PocSearch($pocSearchLong: String!, $pocSearchLat: String!) {
        pocSearch(long: $pocSearchLong, lat: $pocSearchLat) {
            id
            status
            name
        }
    }`;
    
    static readonly allProduct = gql`
    query Poc($pocId: String!, $productsSearch: String, $productsCategoryId: String) {
        poc(id: $pocId) {
            id
            status
            name
            products(search: $productsSearch, categoryId: $productsCategoryId) {
                id
                title
                image
                price
                category {
                    id
                    title
                }
            }
        }
    }`;

    static readonly categories = gql`
    query Categories {
        categories {
        id
        title
        }
    }
    `;

}