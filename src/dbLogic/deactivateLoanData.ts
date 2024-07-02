import { LoanModel } from "../data/loan";

export const deactivateLoanData = async ( loanId: string ) => {
    try {
        console.log(`Updating loan ${loanId}`);
        await new LoanModel( { _id: loanId } )
            .updateOne({
                paidOff: true,
                endDate: new Date().toDateString()
            });
        console.log('Saved!');
    } catch (error) {
        console.error('Error when saving to DB', error);
    }
};