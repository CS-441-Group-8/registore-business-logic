import { execGraphQLQuery, QueryResult } from "../database/query-runner";

import { Discount, DiscountSchema } from "../models/discount-model";

namespace DiscountController {
    // CREATE FUNCTIONS
    export async function createNewDiscount(discount: Discount): Promise<QueryResult> {
        const graphQuery = `mutation {
            createDiscount(
              input: {
                clientMutationId :"${Date.now()}"
                discount : {id:${discount.id} discountType :"${discount.discount_type}" amount: "${discount.amount}"}
              }) {
              discount {
                id
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

        
        const createID = queryResult.data.createDiscount.discount.id;
        return {
            error: null,
            data: createID
        }
    }


    // READ FUNCTIONS
    export async function getDiscount(id: number): Promise<QueryResult> {
        const graphQuery = `query {
            discountById(id: ${id}) {
                id
                discountType
                amount
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


        const discount = queryResult.data.discountById;

        return {
            error: null,
            data: discount
        }
    }


    // UPDATE FUNCTIONS
    export async function updateDiscount(discountId: number, newAmount: number): Promise<QueryResult> {
        const graphQuery = `mutation {
            updateDiscountById( input: {
                id: ${discountId},
                discountPatch: {
                    amount: "${newAmount}"
                }
            }) {
                discount {
                    id
                    amount
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
            data: queryResult.data.updateDiscountById.discount.id
        }

    }




    // DELETE FUNCTIONS
    export async function deleteDiscount(discountId: number): Promise<QueryResult> {
        const graphQuery = `mutation {
            deleteDiscountById(input: {
                id: ${discountId}
            }) {
                discount {
                    id
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
            data: discountId // Return the ID of the deleted discount
        }
    }



}

export default DiscountController;
