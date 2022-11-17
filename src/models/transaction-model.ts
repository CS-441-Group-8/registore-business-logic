/* 
create table Transaction(
	id BIGSERIAL NOT NULL PRIMARY KEY,
	date VARCHAR(50) NOT NULL,
	salesperson_id INT NOT NULL,
	total DECIMAL(5,2) NOT NULL,
	discount DECIMAL(4,2) NOT NULL,
	final_total DECIMAL(5,2) NOT NULL,
	payment_type VARCHAR(50) NOT NULL,
	creditcard_type VARCHAR(64),
	creditcard_number VARCHAR(64),
	creditcard_expiration VARCHAR(64)
);
*/


import { TransactionSchema, PaymentType } from "./schemas/transaction-schema";

class Transaction implements TransactionSchema {
	id: number;
	date: string;
	salesperson_id: number;
	total: number;
	discount: number;
	final_total: number;
	payment_type: PaymentType;
	creditcard_type: string | null;
	creditcard_number: string | null;
	creditcard_expiration: string | null;

	// Constructor will take a TransactionSchema object and assign it to the class
	constructor(transaction: TransactionSchema) {
		this.id = transaction.id;
		this.date = transaction.date;
		this.salesperson_id = transaction.salesperson_id;
		this.total = transaction.total;
		this.discount = transaction.discount;
		this.final_total = transaction.final_total;
		this.payment_type = transaction.payment_type;
		this.creditcard_type = transaction.creditcard_type;
		this.creditcard_number = transaction.creditcard_number;
		this.creditcard_expiration = transaction.creditcard_expiration;
	}
}

export {
	Transaction,
	TransactionSchema,
	PaymentType
}