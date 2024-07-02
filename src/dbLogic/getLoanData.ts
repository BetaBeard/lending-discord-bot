import { LoanModel } from "../data/loan";

export const getLoanData = async () => {
    try {
        console.log('Searching in db...');
        const loandData = await LoanModel.find({ paidOff: false }).exec();
        console.log('Query complete!')
        return loandData;
    } catch (error) {
        console.error('Error when querying DB', error);
        return [];
    }
};