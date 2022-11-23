// Model Imports
import { Product } from "../product-model";
import { Discount } from "../discount-model";
import {
        PaymentType, 
        Transaction, 
        TransactionItem, 
        productsToTransactionItems, 
        discountsToDiscountItems,
        TransactionDiscounts
    } from "../transaction-model";


interface TransactionBuilder {
    build(): Transaction;

    setDate(date: string): TransactionBuilder;
    setItems(items: Array<Product>): TransactionBuilder;
    setSalespersonId(salesperson_id: number): TransactionBuilder;
    setTotal(total: number): TransactionBuilder;
    setDiscounts(discount: Array<Discount>): TransactionBuilder;
}


class GenericTransactionBuilder implements TransactionBuilder {
    transaction: Transaction;

    constructor() {
        this.transaction = {
            id: 0,
            date: "",
            salesperson_id: 0,
            total: 0,
            discount: 0,
            final_total: 0,
            payment_type: PaymentType.cash,
            creditcard_type: null,
            creditcard_number: null,
            creditcard_expiration: null,
            items: [],
            discounts: []
        }
    }

    build(): Transaction {
        return this.transaction;
    }

    setDate(date: string): TransactionBuilder {
        this.transaction.date = date;
        return this;
    }

    setItems(items: Array<Product>): TransactionBuilder {
        this.transaction.items = productsToTransactionItems(items, this.transaction.id);
        return this;
    }

    setSalespersonId(salesperson_id: number): TransactionBuilder {
        this.transaction.salesperson_id = salesperson_id;
        return this;
    }

    setTotal(total: number): TransactionBuilder {
        this.transaction.total = total;
        return this;
    }

    setDiscounts(discounts: Array<Discount>): TransactionBuilder {
        this.transaction.discounts = discountsToDiscountItems(discounts, this.transaction.id);
        // Calculate the discount amount
        let discountAmount = 0;
        for (let discount of discounts) {
            discountAmount += discount.amount;
        }
        this.transaction.discount = discountAmount;
        this.transaction.final_total = this.transaction.total - discountAmount;
        return this;
    }
}

class CreditCardTransactionBuilder extends GenericTransactionBuilder {
    build(): Transaction {
        return this.transaction;
    }

    setCreditCardType(creditcard_type: string): CreditCardTransactionBuilder {
        this.transaction.creditcard_type = creditcard_type;
        return this;
    }

    setCreditCardNumber(creditcard_number: string): CreditCardTransactionBuilder {
        this.transaction.creditcard_number = creditcard_number;
        return this;
    }

    setCreditCardExpiration(creditcard_expiration: string): CreditCardTransactionBuilder {
        this.transaction.creditcard_expiration = creditcard_expiration;
        return this;
    }
}

class CashTransactionBuilder extends GenericTransactionBuilder {
    build(): Transaction {
        return this.transaction;
    }
}


export {
    CreditCardTransactionBuilder,
    CashTransactionBuilder
};