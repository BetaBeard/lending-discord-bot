import { CommandInteraction } from "discord.js";
import { Command } from "./commandInterface";
import { getPaidOffLoanData } from "../dbLogic/getPaidOffLoanData";

// Requests the modal to create a new loan
export const getPaidOffLoans: Command = {
    name: "paidoffloans",
    description: "Get all paid off loans",
    run: async (interaction: CommandInteraction) => {
        try {
            await interaction.deferReply(); // Defer the reply to allow more time

            const loans = await getPaidOffLoanData();
            if (loans.length === 0) {
                await interaction.editReply({
                    content: 'No paid off loans found, start hounding some people'
                });
                return;
            }

            let content = 'Paid Off Loans:\n';
            const messages = [];

            loans.forEach((loan, index) => {
                // Discord admits a maximun of 5 ActionRows per message
                if (index > 0 && index % 10 === 0) { // Limit content size to avoid exceeding message length limit
                    // Send the current message and start a new one
                    messages.push({ content });
                    content = 'Paid Off Loans (continued):\n';
                }

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
            console.error('Error when retrieving paid off loans', error);
            await interaction.editReply({
                content: 'There was an error retrieving the paid off loans. Please try again later.'
            });
        }
    }
};
