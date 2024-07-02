import { LoanModel } from "../data/loan";

export const addLoanData = async (
    lender: string, borrower: string, category: string, item: string, startDate: string
) => {
    try {
        console.log('Saving to db...');
        await new LoanModel( {lender, borrower, category, item, startDate, paidOff: false} ).save();
        console.log('Saved!');
    } catch (error) {
        console.error('Error when saving to DB', error);
    }
};