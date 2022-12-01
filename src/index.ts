// Node Imports
import { exit } from "process";

// Controller imports
import TransactionController from "./controllers/transaction-controller";
import EmployeeController from "./controllers/employee-controller";
import ProductController from "./controllers/product-controller";
import DiscountController from "./controllers/discount-controller";

// Model imports
import { TransactionSchema, Transaction, PaymentType } from "./models/transaction-model";
import { Product, ProductSchema } from "./models/product-model";
import { Discount, DiscountSchema } from "./models/discount-model";
import { Employee, EmployeeSchema } from "./models/employee-model";

// Builder Imports
import { CashTransactionBuilder, CreditCardTransactionBuilder } from "./models/builders/transaction-builders";
import ProductBuilder from "./models/builders/product-builder";
import { DiscountBuilder } from "./models/builders/discount-builder";
import { EmployeeBuilder } from "./models/builders/employee-builder";

// Utility imports
import { currentDateTime, isISO8601Date } from "./utils/datetime";

// Write your test code here
async function main() {
    // Write your test code here
    return;
}

// Uncomment this line to run the main function
// main() // NOTE: MAIN FUNCTION WILL NOT EXPORTED, THIS IS PURELY FOR TESTING
// .then(() => {
//     exit(0);
// });

export {
    // Controllers
    TransactionController,
    EmployeeController,
    ProductController,
    DiscountController,

    // Models
    TransactionSchema,
    Transaction,
    PaymentType,
    Product,
    ProductSchema,
    Discount,
    DiscountSchema,
    Employee,
    EmployeeSchema,


    // Builders 
    CashTransactionBuilder,
    CreditCardTransactionBuilder,
    ProductBuilder,
    DiscountBuilder,
    EmployeeBuilder,


    // Utils
    currentDateTime,
    isISO8601Date,

}
