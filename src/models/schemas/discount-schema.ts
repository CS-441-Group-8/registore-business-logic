/*
create table discount (
	id INT NOT NULL PRIMARY KEY,
	discount_type VARCHAR(50),
	amount DECIMAL(3,2)
);
*/

interface DiscountSchema {
    id: number;
    discount_type: string;
    amount: number;
}

export{DiscountSchema};
