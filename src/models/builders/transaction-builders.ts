import { PaymentType, Transaction } from "../transaction-model";

interface TransactionBuilder {
    build(): Transaction;

    setDate(date: string): TransactionBuilder;
    setSalespersonId(salesperson_id: number): TransactionBuilder;
    setTotal(total: number): TransactionBuilder;
    setDiscount(discount: number): TransactionBuilder;
}

class CreditCardTransactionBuilder implements TransactionBuilder {
    private transaction: Transaction;

    constructor() {
        this.transaction = {
            id: 0,
            date: "",
            salesperson_id: 0,
            total: 0,
            discount: 0,
            final_total: 0,
            payment_type: PaymentType.credit,
            creditcard_type: "",
            creditcard_number: "",
            creditcard_expiration: ""
        };
    }

    build(): Transaction {
        return this.transaction;
    }

    

    setDate(date: string): CreditCardTransactionBuilder {
        this.transaction.date = date;
        return this;
    }

    setSalespersonId(salesperson_id: number): CreditCardTransactionBuilder {
        this.transaction.salesperson_id = salesperson_id;
        return this;
    }

    setTotal(total: number): CreditCardTransactionBuilder {
        this.transaction.total = total;
        return this;
    }

    setDiscount(discount: number): CreditCardTransactionBuilder {
        this.transaction.discount = discount;
        return this;
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

class CashTransactionBuilder implements TransactionBuilder {
    private transaction: Transaction;

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
            creditcard_expiration: null
        };
    }

    build(): Transaction {
        return this.transaction;
    }

    setDate(date: string): CashTransactionBuilder {
        this.transaction.date = date;
        return this;
    }

    setSalespersonId(salesperson_id: number): CashTransactionBuilder {
        this.transaction.salesperson_id = salesperson_id;
        return this;
    }

    setTotal(total: number): CashTransactionBuilder {
        this.transaction.total = total;
        return this;
    }

    setDiscount(discount: number): CashTransactionBuilder {
        this.transaction.discount = discount;
        return this;
    }
}

export {
    CreditCardTransactionBuilder,
    CashTransactionBuilder
};