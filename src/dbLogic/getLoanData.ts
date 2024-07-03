import { LoanModel } from "../schemas/loan";

// Function to get all active (not paid off) loan data from the database
export const getActiveLoanData = async () => {
    return await _queryDB(false);
};

// Function to get all paid off loan data from the database
export const getPaidOffLoanData = async () => {
    return await _queryDB(true);
};

const _queryDB = async(paidOff: boolean) => {
    try {
        console.log('Searching in db...');

        // Query the database
        const loanData = await LoanModel.find({ paidOff }).exec();

        console.log('Query complete!');

        // Return the queried loan data
        return loanData;
    } catch (error) {
        // Handle any errors that occur during the query operation
        console.error('Error when querying DB', error);

        // Throw error up to be catch by specific command
        throw error;
    }  
};