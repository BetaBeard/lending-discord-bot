import { Events, CommandInteraction, Client, Interaction, ModalSubmitInteraction, ButtonInteraction, CacheType } from "discord.js";
import { Commands } from "../commands";
import { addLoanData } from "../dbLogic/addLoanData";
import { deactivateLoanData } from "../dbLogic/deactivateLoanData";

// Default export function to handle client events
export default (client: Client): void => {
    client.on(Events.InteractionCreate, async (interaction: Interaction) => {
        // Check if the interaction is a command or context menu command
        if (interaction.isCommand() || interaction.isContextMenuCommand()) {
            await handleSlashCommand(interaction);
        }

        // Check if the interaction is a modal submission
        if (interaction.isModalSubmit()) {
            await handleLoanSubmission(interaction);
        }

        // Check if the interaction is a button press
        if (interaction.isButton()) {
            await handleLoanReturn(interaction);
        }
    });
};

// Function to handle slash commands
const handleSlashCommand = async (interaction: CommandInteraction): Promise<void> => {
    // Find the command in the Commands list that matches the interaction command name
    const slashCommand = Commands.find(c => c.name === interaction.commandName);
    
    // If the command is not recognized, send an error message
    if (!slashCommand) {
        interaction.followUp({ content: "I don't recognize that command" });
        return;
    }

    // Run the command
    await slashCommand.run(interaction);
};

// Function to handle loan submissions from modals
const handleLoanSubmission = async (interaction: ModalSubmitInteraction): Promise<void> => {
    const { user } = interaction;
    
    // Get the data entered by the user in the modal
    const borrower = interaction.fields.getTextInputValue('borrowerInput');
    const category = interaction.fields.getTextInputValue('categoryInput');
    const item = interaction.fields.getTextInputValue('itemInput');
    const date = interaction.fields.getTextInputValue('dateInput');
    
    // Add the loan data to the database
    await addLoanData(
        user.displayName, // The lender's name
        borrower,         // The borrower's name
        category,         // The category of the item
        item,             // The item being loaned
        date ? new Date(date).toDateString() : new Date().toDateString() // The start date of the loan
    );
    
    // Reply to the interaction indicating the loan was created
    await interaction.reply({ content: 'Loan created!' });
};

// Function to handle loan return from button interactions
const handleLoanReturn = async (interaction: ButtonInteraction<CacheType>) => {
    const { customId } = interaction;

    // Deactivate the loan using the custom ID (loan ID)
    await deactivateLoanData(customId);

    // Reply to the interaction indicating the loan was updated
    await interaction.reply({ content: 'Loan updated!' });
};
