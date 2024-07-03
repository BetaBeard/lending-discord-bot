import { LoanModel } from "../schemas/loan";

// Function to deactivate a loan by marking it as paid off
export const deactivateLoanData = async (loanId: string) => {
    try {
        console.log(`Updating loan ${loanId}`);

        // Find the loan by its ID and update it to mark it as paid off
        await LoanModel.updateOne(
            { _id: loanId }, // Find the loan with this ID
            {
                paidOff: true, // Mark the loan as paid off
                endDate: new Date().toDateString() // Set the end date to the current date
            }
        );

        console.log('Saved!');
    } catch (error) {
        // Handle any errors that occur during the update operation
        console.error('Error when saving to DB', error);
    }
};
