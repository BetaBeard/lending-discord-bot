import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, MessageActionRowComponentBuilder } from "discord.js";
import { Command } from "./commandInterface";
import { getLoanData } from "../dbLogic/getLoanData";

// Requests the modal to create a new loan
export const getActiveLoans: Command = {
    name: "activeloans",
    description: "Get all active loans",
    run: async (interaction: CommandInteraction) => {
        try {
            await interaction.deferReply(); // Defer the reply to allow more time

            const loans = await getLoanData();
            if (loans.length === 0) {
                await interaction.editReply({
                    content: 'No active loans found, hope you didn\'t forget to create any (:'
                });
                return;
            }

            let content = 'Active Loans:\n';
            let currentComponents: ActionRowBuilder<MessageActionRowComponentBuilder>[] = [];
            const messages = [];

            loans.forEach((loan) => {
                // Discord admits a maximun of 5 ActionRows per message
                if (currentComponents.length >= 5) {
                    // Send the current message and start a new one
                    messages.push({
                        content,
                        components: currentComponents
                    });
                    content = 'Active Loans (continued):\n';
                    currentComponents = [];
                }

                content += `\nBorrower: ${loan.borrower}\nCategory: ${loan.category}\nItem: ${loan.item}\nWhen: ${loan.startDate}\n`;
                content += '________________________';

                const payOffLoanButton = new ButtonBuilder()
                    .setCustomId(loan.id) // Ensure the custom ID is unique and correctly set
                    .setLabel(`Pay off ${loan.borrower} for ${loan.item}`)
                    .setStyle(ButtonStyle.Primary);

                const row = new ActionRowBuilder<MessageActionRowComponentBuilder>()
                    .addComponents(payOffLoanButton);

                currentComponents.push(row);
            });

            // Push the remaining components
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
            console.error('Error when retrieving active loans', error);
            await interaction.editReply({
                content: 'There was an error retrieving the active loans. Please try again later.'
            });
        }
    }
};
