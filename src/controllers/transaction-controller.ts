import { execGraphQLQuery, QueryResult } from "../database/query-runner";

import { Transaction, TransactionSchema, PaymentType } from "../models/transaction-model";

namespace TransactionController {
    // CREATE FUNCTIONS
    export async function createNewTransaction(transaction: Transaction): Promise<QueryResult> {
        const graphQuery = `mutation {
                createTransaction( input: {
                    transaction: {
                        date: "${transaction.date}"
                        salespersonId: ${transaction.salesperson_id}
                        total: "${transaction.total}"
                        discount: "${transaction.discount}"
                        finalTotal: "${transaction.final_total}"
                        paymentType: "${transaction.payment_type}"
                        creditcardType: "${transaction.creditcard_type}"
                        creditcardNumber: "${transaction.creditcard_number}"
                        creditcardExpiration: "${transaction.creditcard_expiration}"
                    }
                }) {
                transaction {
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

        
        const createID = queryResult.data.createTransaction.transaction.id;
        return {
            error: null,
            data: createID
        }
    }


    // READ FUNCTIONS
    export async function getTransaction(transactionId: number): Promise<QueryResult> {
        const graphQuery = `query {
            transactionById(id: "${transactionId}") {
                id
                date
                salespersonId
                total
                discount
                finalTotal
                paymentType
                creditcardType
                creditcardNumber
                creditcardExpiration
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


        const transaction = queryResult.data.transactionById;

        return {
            error: null,
            data: transaction
        }
    }


    // UPDATE FUNCTIONS
    export async function updateTransactionSalesperson(transactionId: number, salesPersonId: number): Promise<QueryResult> {
        const graphQuery = `mutation {
            updateTransactionById( input: {
                id: "${transactionId}",
                transactionPatch: {
                    salespersonId: ${salesPersonId}
                }
            }) {
                transaction {
                    id
                    salespersonId
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
            data: queryResult.data.updateTransactionById.transaction.id
        }

    }




    // DELETE FUNCTIONS
    export async function deleteTransaction(transactionId: number): Promise<QueryResult> {
        const graphQuery = `mutation {
            deleteTransactionById(input: {
                id: "${transactionId}"
            }) {
                transaction {
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
            data: transactionId // Return the ID of the deleted transaction
        }
    }



}

export default TransactionController;
