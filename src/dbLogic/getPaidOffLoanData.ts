import { LoanModel } from "../data/loan";

export const getPaidOffLoanData = async () => {
    try {
        console.log('Searching in db...');
        const loandData = await LoanModel.find({ paidOff: true }).exec();
        console.log('Query complete!')
        return loandData;
    } catch (error) {
        console.error('Error when querying DB', error);
        return [];
    }
};