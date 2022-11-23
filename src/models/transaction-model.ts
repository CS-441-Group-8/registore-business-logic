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

// Model Imports
import { Product } from "./product-model";
import { Discount } from "./discount-model";

// Schema Imports
import { TransactionSchema, PaymentType } from "./schemas/transaction-schema";
import { TransactionItemSchema } from "./schemas/transaction-item-schema";
import { TransactionDiscountSchema } from "./schemas/transaction-discount-schema";

class Transaction implements TransactionSchema {
	id: number;
	date: string;
	salesperson_id: number;
	total: number;
	discount: number; // Discount amount
	final_total: number;
	payment_type: PaymentType;
	creditcard_type: string | null;
	creditcard_number: string | null;
	creditcard_expiration: string | null;
	items: TransactionItems;
	discounts: TransactionDiscounts;

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
		this.items = [];
		this.discounts = []; 
	}
}


class TransactionItem implements TransactionItemSchema {
	transaction_id: number;
	sku: string;
	quantity: number;

	constructor(transactionID: number, sku: string) {
		this.transaction_id = transactionID;
		this.sku = sku;
		this.quantity = 0;
	}
}

type TransactionItems = Array<TransactionItem>;

function productsToTransactionItems(products: Array<Product>, transactionID: number): Array<TransactionItem> {
    let itemsMap = new Map<string, TransactionItem>();
    products.forEach((product: Product) => {
        if (itemsMap.has(product.sku)) {
            itemsMap.get(product.sku)!.quantity++;
        } else {
            itemsMap.set(product.sku, new TransactionItem(transactionID, product.sku));
			itemsMap.get(product.sku)!.quantity = 1; // Initialize quantity to 1
        }
    });
	return Array.from(itemsMap.values());
}


class TransactionDiscount implements TransactionDiscountSchema {
	transactionId: number;
	discountId: number;

	constructor(transactionDiscount: TransactionDiscountSchema) {
		this.transactionId = transactionDiscount.transactionId;
		this.discountId = transactionDiscount.discountId;
	}
}

type TransactionDiscounts = Array<TransactionDiscount>;

function discountsToDiscountItems(discounts: Array<Discount>, transactionID: number): TransactionDiscounts {
	let transactionDiscounts: Array<TransactionDiscount> = [];
	discounts.forEach((discount: Discount) => {
		transactionDiscounts.push(new TransactionDiscount({transactionId: transactionID, discountId: discount.id}));
	});
	return transactionDiscounts;
}

export {
	Transaction,
	TransactionSchema,
	PaymentType,
	TransactionItem,
	TransactionItems,	
	productsToTransactionItems,
	TransactionDiscount,
	TransactionDiscounts,
	discountsToDiscountItems
}
