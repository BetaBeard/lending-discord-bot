import { CommandInteraction, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ModalActionRowComponentBuilder } from "discord.js";
import { ICommand } from "../interfaces/command";

// Requests the modal to create a new loan
export const addLoan: ICommand = {
    name: "addloan",
    description: "Add a new loan",
    run: async (interaction: CommandInteraction) => {
		const modal = new ModalBuilder()
		.setCustomId('loanModal')
        .setTitle('Add a new loan');

		// Create the text input components
		const borrowerInput = new TextInputBuilder()
            .setCustomId('borrowerInput')
            // The label is the prompt the user sees for this input
            .setLabel("Who's borrowing:")
            // Short means only a single line of text
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

        // Create the text input components
        const categoryInput = new TextInputBuilder()
            .setCustomId('categoryInput')
            // The label is the prompt the user sees for this input
            .setLabel("What are they borrowing:")
            // Short means only a single line of text
            .setStyle(TextInputStyle.Short)
            .setRequired(true);
        

		// Create the text input components
		const itemInput = new TextInputBuilder()
            .setCustomId('itemInput')
            // The label is the prompt the user sees for this input
            .setLabel("What's the name of the item':")
            // Short means only a single line of text
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

		// Create the text input components
		const dateInput = new TextInputBuilder()
            .setCustomId('dateInput')
            // The label is the prompt the user sees for this input
            .setLabel("When did they borrow it (empty for today):")
            // Short means only a single line of text
            .setStyle(TextInputStyle.Short)
            .setRequired(false);

        // Create action rows to hold the text input components
        const borrowerRow = new ActionRowBuilder<ModalActionRowComponentBuilder>()
			.addComponents(borrowerInput);
        const categoryRow = new ActionRowBuilder<ModalActionRowComponentBuilder>()
            .addComponents(categoryInput);
        const itemRow = new ActionRowBuilder<ModalActionRowComponentBuilder>()
			.addComponents(itemInput);
        const dateRow = new ActionRowBuilder<ModalActionRowComponentBuilder>()
            .addComponents(dateInput);

        modal.addComponents(borrowerRow, categoryRow, itemRow, dateRow);
        
		// Show the modal to the user
		await interaction.showModal(modal);
    }
};