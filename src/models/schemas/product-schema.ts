/*
create table product (
	sku VARCHAR(50) NOT NULL PRIMARY KEY,
	title VARCHAR(50) NOT NULL,
	brand VARCHAR(50) NOT NULL,
	summary TEXT NOT NULL,
	price FLOAT NOT NULL,
	quantity INT NOT NULL,
	category VARCHAR(50) NOT NULL,
	creator INT NOT NULL,
	creation_date DATE NOT NULL,
	supplier VARCHAR(50)
);
*/


interface ProductSchema {
    sku: string;
    title: string;
    brand: string;
    summary: string;
    price: number;
    quantity: number;
    category: string;
    creator: number;
    creation_date: string;
    supplier: string | null;
}


export{ProductSchema};
