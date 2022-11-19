/*
create table discount (
	id INT NOT NULL PRIMARY KEY,
	discount_type VARCHAR(50),
	amount DECIMAL(3,2)
);
*/
import { DiscountSchema } from "./schemas/discount-schema";
class Discount implements DiscountSchema{
    id: number;
    discount_type: string;
    amount: number;
    // Constructor will take a DiscountSchema object and assign it to the class
	constructor(discount: DiscountSchema) {
        this.id = discount.id;
        this.discount_type = discount.discount_type;
        this.amount = discount.amount;
	}
}
export {
    Discount,
    DiscountSchema
}