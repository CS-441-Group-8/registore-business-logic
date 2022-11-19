import { Discount } from "../discount-model";
interface DiscountBuilder {
    build(): Discount;

    setDiscountId(discountId: number): DiscountBuilder;
    setDiscountType(discount_type: string): DiscountBuilder;
    setAmount(amount: number): DiscountBuilder;
}
class DiscountBuilder implements DiscountBuilder {
    private discount: Discount;
    constructor() {
        this.discount = {
            id: 0,
            discount_type: "",
            amount: 0
        };
    }

    build(): Discount {
        return this.discount;
    }

    setDiscountId(discountId: number): DiscountBuilder {
        this.discount.id = discountId;
        return this;
    }

    setDiscountType(discount_type: string) {
        this.discount.discount_type = discount_type;
        return this;
    }

    setAmount(amount: number) {
        this.discount.amount = amount;
        return this;
    }

}
export {
    DiscountBuilder
};