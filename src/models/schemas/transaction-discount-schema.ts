/*
create table transaction_discount (
	transaction_id INT REFERENCES transaction(id) ON UPDATE CASCADE ON DELETE CASCADE,
	discount_id INT REFERENCES discount(id) ON UPDATE CASCADE ON DELETE CASCADE
);
*/

interface TransactionDiscountSchema {
	transactionId: number;
	discountId: number;
}

export { TransactionDiscountSchema };
