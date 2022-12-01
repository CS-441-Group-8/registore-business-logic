// Database Imports
import { execGraphQLQuery, QueryResult } from "../database/query-runner";

// Model Imports
import {
    Transaction,
    TransactionItem,
    TransactionItems,
    TransactionDiscount,
    TransactionDiscounts
} from "../models/transaction-model";

// Builder Imports
import {
    CashTransactionBuilder,
    CreditCardTransactionBuilder
} from "../models/builders/transaction-builders";

// Utility Imports
import { currentDateTime, isISO8601Date } from "../utils/datetime";

import { Product } from "../models/product-model";
import { Discount } from "../models/discount-model";


namespace Constants {
    export var nodes = `
    id
    date
    salesperson_id: salespersonId
    total
    discount
    final_total: finalTotal
    payment_type: paymentType
    creditcard_type: creditcardType
    creditcard_number: creditcardNumber
    creditcard_expiration: creditcardExpiration
    items: transactionItemsByTransactionId {
        edges {
            node {
                transaction_id: transactionId
                sku 
                quantity
            }
        }
    }
    discounts: transactionDiscountsByTransactionId {
        edges {
            node {
                transaction_id: transactionId
                discount_id: discountId
            }
        }
    }
    `;
}



namespace Utilities {
    // Pass in
    export function parseTransactionItems(edges: any): TransactionItems {
        let transactionItems: TransactionItems = [];
        edges.forEach((edge: any) => {
            let item = edge.node;
            transactionItems.push(item as TransactionItem);
        });
        return transactionItems;
    }
    // Iterate through edges, get the node, transaction and push into array of transactions
    export function parseTransactionDiscounts(edges: any): TransactionDiscounts {
        let transactionDiscounts: TransactionDiscounts = [];
        edges.forEach((edge: any) => {
            let discount = edge.node;
            transactionDiscounts.push(discount as TransactionDiscount);
        });
        return transactionDiscounts;
    }

    export function parseTransactionsQueryResult(edges: any): Array<Transaction> {
        let transactions: Array<Transaction> = []; 
        edges.forEach((edge: any) => {
            let transaction = edge.node;
            transaction.id = parseInt(transaction.id);
            transaction.items = parseTransactionItems(transaction.items.edges);
            transaction.discounts = parseTransactionDiscounts(transaction.discounts.edges);
            transactions.push(transaction as Transaction);
        });
        return transactions;
    }
}




namespace TransactionController {
    // Creates a new transaction in the database
    export async function createNewTransaction(transaction: Transaction): Promise<QueryResult> {
        let graphQuery = `mutation {
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

        let transactionCreateResult = await execGraphQLQuery(graphQuery);
        // Add to TransactionItems table
        let transactionItemCreateResult = await addTransactionItems(transaction.items, transactionCreateResult.data.createTransaction.transaction.id);
        if (transactionItemCreateResult.error !== null) {
            console.log("Error adding transaction items:\n" + transactionItemCreateResult.error);
        }

        if (transaction.discounts.length > 0) {
            // Add to TransactionDiscounts table
            let transactionDiscountCreateResult = await addTransactionDiscounts(transaction.discounts, transactionCreateResult.data.createTransaction.transaction.id);
            if (transactionDiscountCreateResult.error !== null) {
                console.log(transactionDiscountCreateResult.error);
            }
        }

        if (transactionCreateResult.error !== null) {
            console.log("Error creating transaction");
            return {
                error: transactionCreateResult.error,
                data: null
            }
        }

        const createID = transactionCreateResult.data.createTransaction.transaction.id;

        return {
            error: null,
            data: {
                createID: createID
            }
        }

    }

    async function addTransactionItems(transactionItems: TransactionItems, transactionID: number): Promise<QueryResult> {
        // Loop through transactionItems and add them to the database
        for (let i = 0; i < transactionItems.length; i++) {
            let graphQuery = `mutation {
                createTransactionItem( input: {
                    transactionItem: {
                        transactionId: ${transactionID}
                        sku: "${transactionItems[i].sku}"
                        quantity: ${transactionItems[i].quantity}
                    }
                }) {
                    transactionItem {
                        transactionId
                    }
                }
            }`;
            const queryResult = await execGraphQLQuery(graphQuery);
            if (queryResult.error !== null) {
                console.log("Error creating transaction item");
            }
        }

        return {
            error: null,
            data: transactionID
        }

    }

    async function addTransactionDiscounts(discounts: TransactionDiscounts, transactionID: number): Promise<QueryResult> {
        // Loop through discounts and add them to the database
        for (let i = 0; i < discounts.length; i++) {
            let graphQuery = `mutation {
                createTransactionDiscount( input: {
                    transactionDiscount: {
                        transactionId: ${transactionID}
                        discountId: ${discounts[i].discountId}
                    }
                }) {
                    transactionDiscount {
                        transactionId
                    }
                }
            }`;
            const queryResult = await execGraphQLQuery(graphQuery);
            if (queryResult.error !== null) {
                console.log("Error creating transaction discount");
            }
        }

        return {
            error: null,
            data: transactionID
        }

    }

    // FRONTEND CREATE FUNCTIONS

    // Creates a Transaction Object given products, discount, and salesperson ID
    export async function createCashTransaction(products: Array<Product>, discounts: Array<Discount> | null, salespersonID: number): Promise<QueryResult> {
        let total = calculateTotalWithDiscount(products, discounts); // Calculate total, returns a number

        // Add the transaction record to the database
        let newCashTransaction = new CashTransactionBuilder()
        .setDate(currentDateTime())
        .setSalespersonId(salespersonID)
        .setTotal(total)
        .setDiscounts(discounts ? discounts : [])
        .setItems(products)
        .build();
        const queryResult = await createNewTransaction(newCashTransaction); // Add the transaction to the database

        if (queryResult.error !== null) {
            return {
                error: queryResult.error,
                data: null
            }
        }

        const createID = queryResult.data.createID;

        return {
            error: null,
            data: createID
        }

    }


    export async function createCardTransaction(products: Array<Product>, discount: Array<Discount> | null, salespersonID: number): Promise<QueryResult> {
        let total = calculateTotalWithDiscount(products, discount);
        let newCardTransaction = new CreditCardTransactionBuilder()
        .setDate(currentDateTime())
        .setSalespersonId(salespersonID)
        .setTotal(total)
        .setDiscounts(discount ? discount : [])
        .setItems(products)
        .build();

        let queryResult = await createNewTransaction(newCardTransaction);

        if (queryResult.error !== null) {
            return {
                error: queryResult.error,
                data: null
            }
        }

        return {
            error: null,
            data: null
        }

    }

    // Calculates the total (before discount) of a transaction
    export function calculateTotal(products: Array<Product>): number {
        // Calculate the cost of the transaction
        let total: number = 0;
        products.forEach((product: Product) => {
            total += product.price;
        });
        // Round the total to 2 decimal places
        return Math.round(total * 100) / 100;
    }


    export function calculateTotalWithDiscount(products: Array<Product>, discount: Array<Discount> | null): number {
        // Calculate the cost of the transaction
        let total: number = 0;
        products.forEach((product: Product) => {
            total += product.price;
        });
        // Apply the discounts
        if (discount !== null) {
            // Calculate the discounted total
            discount.forEach((discount: Discount) => {
                total -= discount.amount;
                if (total < 0) {
                    total = 0;
                }
            });
        }
        // Round the total to 2 decimal places
        return Math.round(total * 100) / 100;

    }


    export async function getTransactionItems(transactionID: number): Promise<QueryResult> {
        const graphQuery = `query {
            allTransactionItems(condition: {
                transactionId: ${transactionID}
            }) {
                edges {
                    node {
                        transactionId
                        sku
                        quantity

                    }
                }
            }

        }`; // We can exclude transaction ID because we already know it


        const queryResult = await execGraphQLQuery(graphQuery);
        if (queryResult.error !== null) {
            return {
                error: queryResult.error,
                data: null
            }
        }

        console.log(queryResult.data.allTransactionItems);
        let transactionItems: TransactionItems = [];
        queryResult.data.allTransactionItems.edges.forEach((edge: any) => {
            transactionItems.push(edge.node as TransactionItem);
        });

        return {
            error: null,
            data: transactionItems
        }
    }


    export async function getTransactionDiscounts(transactionID: number): Promise<QueryResult> {
        const graphQuery = `query {
            allTransactionDiscounts (condition: {
                transactionId: ${transactionID}
            }) {
                edges {
                    node {
                        transactionId
                        discountId
                    }
                }
            }
        }`; // We can exclude transaction ID because we already know it

        const queryResult = await execGraphQLQuery(graphQuery);
        if (queryResult.error !== null) {
            return {
                error: queryResult.error,
                data: null
            }
        }

        return {
            error: null,
            data: queryResult.data.transactionDiscountsByTransactionId
        }
    }


    // READ FUNCTIONS
    export async function getTransaction(transactionId: number): Promise<QueryResult> {
        const graphQuery = `query {
            transactionById(id: "${transactionId}") {
                ${Constants.nodes} 
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

        let transaction = queryResult.data.transactionById;
        transaction.id = parseInt(transaction.id);
        console.log(transaction.items);

        transaction.items = Utilities.parseTransactionItems(transaction.items.edges);
        transaction.discounts = Utilities.parseTransactionDiscounts(transaction.discounts.edges);

        return {
            error: null,
            data: transaction
        }

    }


    export async function getAllTransactions(): Promise<QueryResult> {
        const graphQuery = `query {
            allTransactions {
                edges {
                    node {
                        ${Constants.nodes}
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

        let transactions = Utilities.parseTransactionsQueryResult(queryResult.data.allTransactions.edges);

        return {
            error: null,
            data: transactions
        }
    }


    export async function getTransactionsBySalesperson(salesPersonId: number): Promise<QueryResult> {
        // Get all transactions 
        let graphQuery = `query {
            allTransactions(condition: {
                salespersonId: ${salesPersonId}
            }) {
                edges {
                    node {
                        ${Constants.nodes}
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

        let transactions: Array<Transaction> = Utilities.parseTransactionsQueryResult(queryResult.data.allTransactions.edges);
        // Iterate through the array and convert the floats that are returned as strings

        return {
            error: null,
            data: transactions
        }

    }

    export async function getTransactionsByTotal(): Promise<QueryResult> {
        let allTransactions = await getAllTransactions();
        if (allTransactions.error !== null) {
            return {
                error: allTransactions.error,
                data: null
            }
        }

        // Sort the objects
        let transactions = allTransactions.data;
        transactions.sort((a: Transaction, b: Transaction) => {
            return a.final_total - b.final_total;
        });

        return {
            error: null,
            data: transactions
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
