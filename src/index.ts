// Node Imports
import { exit } from "process";
// Controller imports
import TransactionController from "./controllers/transaction-controller";
// Model imports
import { TransactionSchema, Transaction, PaymentType } from "./models/transaction-model";
// Builder Imports
import { CashTransactionBuilder, CreditCardTransactionBuilder } from "./models/builders/transaction-builders";


// Utility imports
import { currentDateTime, isISO8601Date } from "./utils/datetime";

// Returns a datetime string in the format YYYY-MM-DD HH:MM:SS



async function createNewTransaction() {
    const newCashTransaction = new CashTransactionBuilder()
        .setDate(currentDateTime())
        .setSalespersonId(1)
        .setTotal(100)
        .setDiscount(0)
        .build();

    const queryResult
        = await TransactionController.createNewTransaction(newCashTransaction);

    console.log(queryResult);
}


async function getProduct() {
    const queryResult = await TransactionController.getTransaction(1);
    console.log(queryResult);
}

async function updateTransactionById() {
    const queryResult = await TransactionController.updateTransactionSalesperson(1, 4);
    console.log(queryResult);
}

async function deleteTransactionById() {
    const queryResult = await TransactionController.deleteTransaction(14);
    console.log(queryResult);
}

// Write your test code here
async function main() {
    // await createNewTransaction(); // Works
    // await getProduct(); // Works
    // await updateTransactionById(); // Works
    // await deleteTransactionById(); // Works
}


main() // NOTE: MAIN FUNCTION WILL NOT EXPORTED, THIS IS PURELY FOR TESTING
    .then(() => {
        exit(0);
    });


export {
    // Controllers
    TransactionController,

    // Models
    TransactionSchema,
    Transaction,
    PaymentType,


    // Builders 
    CashTransactionBuilder,
    CreditCardTransactionBuilder,


    // Utils
    currentDateTime,
    isISO8601Date,

}



