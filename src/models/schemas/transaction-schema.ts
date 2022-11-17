enum PaymentType {
	cash = "CASH",
	credit = "CREDIT"
}

interface TransactionSchema {
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
}

export {
    PaymentType,
    TransactionSchema,
};
