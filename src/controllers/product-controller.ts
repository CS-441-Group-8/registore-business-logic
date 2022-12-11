import { execGraphQLQuery, QueryResult } from "../database/query-runner";

import { Product } from "../models/product-model";

namespace Constants {
    export const allNodes = `
        sku
        title
        brand
        summary
        price
        quantity
        category
        creator
        creation_date: creationDate
        supplier
        image_path: imagePath`;
}

namespace ProductController {
    // CREATE FUNCTIONS
    export async function createNewProduct(product: Product): Promise<QueryResult> {
        const graphQuery = `mutation {
            createProduct(
              input: {
                clientMutationId : "${Date.now()}"
                product:{sku: "${product.sku}", title: "${product.title}", brand: "${product.brand}", 
                summary: "${product.summary}", price: ${product.price}, quantity: ${product.quantity}, 
                category: "${product.category}", creator: ${product.creator}, creationDate: "${product.creation_date}", supplier: "${product.supplier}",
                imagePath: "${product.image_path}"}
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
                ${Constants.allNodes}
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
    export async function getAllProducts(): Promise<QueryResult> {
        // Our query includes a unique node id, so that we can delete that node.
        const graphQuery = `query {
            allProducts {
               edges {
                node {
                    ${Constants.allNodes}
                  }
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

        let products: Array<Product> = [];
        queryResult.data.allProducts.edges.forEach((edge: any) => {
            products.push(edge.node);
        });

        return {
            error: null,
            data: products
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
    // UPDATE FUNCTIONS
    export async function updateQuantity(sku: string, quantity: number): Promise<QueryResult> {
        const graphQuery = `mutation {
        updateProductBySku( input: {
            sku: "${sku}",
            productPatch: {
                quantity: ${quantity}
            }
        }) {
            product {
                sku
                quantity
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
            data: queryResult.data.updateProductBySku.product.quantity
        }
    }
    // UPDATE FUNCTIONS
    export async function updateProduct(product: Product): Promise<QueryResult> {
        const graphQuery = `mutation {
        updateProductBySku( input: {
            sku: "${product.sku}",
            productPatch: {
              	title: "${product.title}"
              	brand: "${product.brand}"
              	summary: "${product.summary}"
              	price: ${product.price}
              	quantity: ${product.quantity}
              	category: "${product.category}"
              	creator: ${product.creator}
              	creationDate: "${product.creation_date}"
              	supplier: "${product.supplier}"
            }
        }) {
            product {
              	sku
                title
              	brand
              	summary
              	price
              	quantity
              	category
              	creator
              	creationDate
              	supplier
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
            data: queryResult.data.updateProductBySku.product
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
    export async function deleteProductbySKU(sku: string): Promise<QueryResult> {
        let graphQuery = `query {
            productBySku(sku: "${sku}")
              {
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


        const myNode = String(queryResult.data.productBySku.nodeId);
        // Node ID can be obtained from a query.
        const newgraphQuery = `mutation {
            deleteProduct(input: {
                nodeId: "${myNode}"
            }) {
                product {
                    nodeId 
                }
            }
        }`;
        const myResults = await execGraphQLQuery(newgraphQuery);

        if (myResults.error !== null) {
            return {
                error: myResults.error,
                data: null
            }
        }

        return {
            error: null,
            data: myNode // Return the Node ID of the deleted product
        }
    }



}

export default ProductController;
