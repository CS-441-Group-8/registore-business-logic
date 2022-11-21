/*
create table transaction_items (
    transaction_id INT REFERENCES transaction(id) ON UPDATE CASCADE ON DELETE CASCADE,
    sku VARCHAR(50) REFERENCES product(sku) ON UPDATE CASCADE ON DELETE CASCADE,
    quantity INT 
);
*/

interface TransactionItemSchema {
    transaction_id: number;
    sku: string;
    quantity: number;
}

export { TransactionItemSchema };
