import { execGraphQLQuery, QueryResult } from "../database/query-runner";

import { Product} from "../models/product-model";

namespace ProductController {
    // CREATE FUNCTIONS
    export async function createNewProduct(product: Product): Promise<QueryResult> {
        const graphQuery = `mutation {
            createProduct(
              input: {
                clientMutationId : "${Date.now()}"
                product:{sku: "${product.sku}", title: "${product.title}", brand: "${product.brand}", 
                summary: "${product.summary}", price: ${product.price}, quantity: ${product.quantity}, 
                category: "${product.category}", creator: ${product.creator}, creationDate: "${Date.now()}", supplier: "${product.supplier}"}
              }) {
              product {
                sku
              }
            }
          }
          `;
        const queryResult = await execGraphQLQuery(graphQuery);

        if (queryResult.error !== null) {
            return {
                error: queryResult.error,
                data: null
            }
        }

        
        const sku = queryResult.data.createProduct.product.sku;
        return {
            error: null,
            data: sku
        }
    }


    // READ FUNCTIONS
    export async function getProduct(sku: string): Promise<QueryResult> {
        // Our query includes a unique node id, so that we can delete that node.
        const graphQuery = `query {
            productBySku(sku: "${sku}")
              {
                sku
                brand
                summary
                price
                quantity
                category
                creator
                creationDate
                supplier
                nodeId 
              }
          }
        `;
        const queryResult = await execGraphQLQuery(graphQuery);
        if (queryResult.error !== null) {
            return {
                error: queryResult.error,
                data: null
            }
        }


        const product = queryResult.data.productBySku;

        return {
            error: null,
            data: product
        }
    }


    // UPDATE FUNCTIONS
    export async function updatePrice(sku: string, newPrice: number): Promise<QueryResult> {
        const graphQuery = `mutation {
            updateProductBySku( input: {
                sku: "${sku}",
                productPatch: {
                    price: ${newPrice}
                }
            }) {
                product {
                    sku
                    price
                }
            }
        }`;
        const queryResult = await execGraphQLQuery(graphQuery);
        if (queryResult.error !== null) {
            return {
                error: queryResult.error,
                data: null
            }
        }

        return {
            error: null,
            data: queryResult.data.updateProductBySku.product.price
        }

    }




    // DELETE FUNCTIONS
    export async function deleteProduct(nodeId: string): Promise<QueryResult> {
        // Node ID can be obtained from a query.
        const graphQuery = `mutation {
            deleteProduct(input: {
                nodeId: "${nodeId}"
            }) {
                product {
                    nodeId 
                }
            }
        }`;
        const queryResult = await execGraphQLQuery(graphQuery);

        if (queryResult.error !== null) {
            return {
                error: queryResult.error,
                data: null
            }
        }

        return {
            error: null,
            data: nodeId // Return the Node ID of the deleted product
        }
    }



}

export default ProductController;
