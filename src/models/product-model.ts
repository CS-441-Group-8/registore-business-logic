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
import { ProductSchema } from "./schemas/product-schema";
// Constructor will take a ProductSchema object and assign it to the class
class Product implements ProductSchema{
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
    constructor(product: ProductSchema) {
        this.sku = product.sku;
        this.title = product.title;
        this.brand = product.brand;
        this.summary = product.summary;
        this.price = product.price;
        this.quantity = product.quantity;
        this.category = product.category;
        this.creator = product.creator;
        this.creation_date = product.creation_date;
        this.supplier = product.supplier;
	}
}
export {
    Product,
    ProductSchema
}