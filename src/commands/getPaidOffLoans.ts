import { CommandInteraction } from "discord.js";
import { ICommand } from "../interfaces/command";
import { getPaidOffLoanData } from "../dbLogic/getLoanData";

// Define the command to get all paid off loans
export const getPaidOffLoans: ICommand = {
    name: "paidoffloans",
    description: "Get all paid off loans",
    run: async (interaction: CommandInteraction) => {
        try {
            // Defer the reply to give more time to fetch the loan data
            await interaction.deferReply();

            // Fetch the paid off loan data from the database
            const loans = await getPaidOffLoanData();

            // If no loans are found, inform the user and exit
            if (loans.length === 0) {
                await interaction.editReply({
                    content: 'No paid off loans found, start hounding some people'
                });
                return;
            }

            // Initialize the content for the message and an array to hold messages
            let content = 'Paid Off Loans:\n';
            const messages = [];

            // Iterate over each loan and construct the message content
            loans.forEach((loan, index) => {
                // Split the message if the content size exceeds limits
                if (index > 0 && index % 10 === 0) {
                    // Send the current message and start a new one if limit is reached
                    messages.push({ content });
                    content = 'Paid Off Loans (continued):\n';
                }

                // Add loan details to the content
                content += `\nBorrower: ${loan.borrower}\nCategory: ${loan.category}\nItem: ${loan.item}\nWhen: ${loan.startDate}\nUntil: ${loan.endDate}\n`;
                content += '________________________';
            });

            // Push the remaining content
            if (content.length > 0) {
                messages.push({ content });
            }

            // Send all the messages sequentially
            for (const message of messages) {
                await interaction.followUp(message);
            }

        } catch (error) {
            // Handle any errors that occur during the process
            console.error('Error when retrieving paid off loans', error);
            await interaction.editReply({
                content: 'There was an error retrieving the paid off loans. Please try again later.'
            });
        }
    }
};
