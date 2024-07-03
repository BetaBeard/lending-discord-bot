import { LoanModel } from "../schemas/loan";

// Function to add loan data to the database
export const addLoanData = async (
    lender: string, borrower: string, category: string, item: string, startDate: string
) => {
    try {
        console.log('Saving to db...');

        // Create a new loan document and save it to the database
        await new LoanModel({
            lender,        // The lender's name
            borrower,      // The borrower's name
            category,      // The category of the item
            item,          // The item being loaned
            startDate,     // The start date of the loan
            paidOff: false // The loan is initially not paid off
        }).save();        // Save the document to the database

        console.log('Saved!');
    } catch (error) {
        // Handle any errors that occur during the save operation
        console.error('Error when saving to DB', error);
    }
};
