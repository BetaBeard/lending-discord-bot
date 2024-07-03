import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, MessageActionRowComponentBuilder } from "discord.js";
import { ICommand } from "../interfaces/command";
import { getActiveLoanData } from "../dbLogic/getLoanData";

// Define the command to get all active loans
export const getActiveLoans: ICommand = {
    name: "activeloans",
    description: "Get all active loans",
    run: async (interaction: CommandInteraction) => {
        try {
            // Defer the reply to give more time to fetch the loan data
            await interaction.deferReply();

            // Fetch the loan data from the database
            const loans = await getActiveLoanData();

            // If no loans are found, inform the user and exit
            if (loans.length === 0) {
                await interaction.editReply({
                    content: 'No active loans found, hope you didn\'t forget to create any (:'
                });
                return;
            }

            // Initialize the content for the message and an array to hold action rows
            let content = 'Active Loans:\n';
            let currentComponents: ActionRowBuilder<MessageActionRowComponentBuilder>[] = [];
            const messages = [];

            // Iterate over each loan and construct the message content and action rows
            loans.forEach((loan) => {
                // Discord allows a maximum of 5 action rows per message
                if (currentComponents.length >= 5) {
                    // Send the current message and start a new one if limit is reached
                    messages.push({
                        content,
                        components: currentComponents
                    });
                    content = 'Active Loans (continued):\n';
                    currentComponents = [];
                }

                // Add loan details to the content
                content += `\nBorrower: ${loan.borrower}\nCategory: ${loan.category}\nItem: ${loan.item}\nWhen: ${loan.startDate}\n`;
                content += '________________________';

                // Create a button for paying off the loan
                const payOffLoanButton = new ButtonBuilder()
                    .setCustomId(loan.id) // Set the custom ID to the loan ID
                    .setLabel(`Pay off ${loan.borrower} for ${loan.item}`)
                    .setStyle(ButtonStyle.Primary);

                // Create an action row and add the button to it
                const row = new ActionRowBuilder<MessageActionRowComponentBuilder>()
                    .addComponents(payOffLoanButton);

                // Add the action row to the current components
                currentComponents.push(row);
            });

            // Push the remaining components to messages
            if (currentComponents.length > 0) {
                messages.push({
                    content,
                    components: currentComponents
                });
            }

            // Send all the messages sequentially
            for (const message of messages) {
                await interaction.followUp(message);
            }

        } catch (error) {
            // Handle any errors that occur during the process
            console.error('Error when retrieving active loans', error);
            await interaction.editReply({
                content: 'There was an error retrieving the active loans. Please try again later.'
            });
        }
    }
};
