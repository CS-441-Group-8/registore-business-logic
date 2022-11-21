import { Product } from "../product-model";
interface ProductBuilder {
    build(): Product;

    setSKU(sku: string): ProductBuilder;
    setTitle(title: string): ProductBuilder;
    setBrand(brand: string): ProductBuilder;
    setSummary(summary: string): ProductBuilder;
    setPrice(price: number): ProductBuilder;
    setQuantity(quantity: number): ProductBuilder;
    setCategory(category: string): ProductBuilder;
    setCreator(creator: number): ProductBuilder;
    setCreationDate(creation_date: string): ProductBuilder;
    setSupplier(supplier: string | null): ProductBuilder;

}
class ProductBuilder implements ProductBuilder {
    private product: Product;
    yourDate = new Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'});
    constructor() {
        this.product = {
            sku: "",
            title: "",
            brand: "",
            summary: "",
            price: 0,
            quantity: 0,
            category: "",
            creator: 0,
            creation_date: String(this.yourDate),
            supplier: ""
        };
    }
    setSKU(sku: string)
    {
        this.product.sku = sku;
        return this;
    }
    setTitle(title: string){
        this.product.title = title;
        return this;
    }
    setBrand(brand: string){
        this.product.brand = brand;
        return this;
    }
    setSummary(summary: string){
        this.product.summary = summary;
        return this;
    }
    setPrice(price: number){
        this.product.price = price;
        return this;
    }
    setQuantity(quantity: number){
        this.product.quantity = quantity;
        return this;
    }
    setCategory(category: string){
        this.product.category = category;
        return this;
    }
    setCreator(creator: number){
        this.product.creator = creator;
        return this;
    }
    setCreationDate(creation_date: string){
        this.product.creation_date = creation_date;
        return this;
    }
    setSupplier(supplier: string | null){
        this.product.supplier = supplier;
        return this;
    }
    build()
    {
        return this.product;
    }
}
export default ProductBuilder;