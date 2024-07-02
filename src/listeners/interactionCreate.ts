import { Events, CommandInteraction, Client, Interaction, ModalSubmitInteraction, Integration, ButtonInteraction, CacheType } from "discord.js";
import { Commands } from "../commands";
import { addLoanData } from "../dbLogic/addLoanData";
import { deactivateLoanData } from "../dbLogic/deactivateLoanData";

export default (client: Client): void => {
    client.on(Events.InteractionCreate, async (interaction: Interaction) => {
        if (interaction.isCommand() || interaction.isContextMenuCommand()) {
            await handleSlashCommand(interaction);
        }

        if (interaction.isModalSubmit()) {
            await handleLoanSubmission(interaction);
        }

        if (interaction.isButton()) {
            await handleLoanReturn(interaction);
        }
    });
};

const handleSlashCommand = async (interaction: CommandInteraction): Promise<void> => {
    const slashCommand = Commands.find(c => c.name === interaction.commandName);
    if (!slashCommand) {
        interaction.followUp({ content: "I don't recognize that command" });
        return;
    }

    await slashCommand.run(interaction);
};

const handleLoanSubmission = async (interaction: ModalSubmitInteraction ): Promise<void> => {
    const { user } = interaction;
    // Get the data entered by the user
    const borrower = interaction.fields.getTextInputValue('borrowerInput');
    const category = interaction.fields.getTextInputValue('categoryInput');
    const item = interaction.fields.getTextInputValue('itemInput');
    const date = interaction.fields.getTextInputValue('dateInput');
    
    await addLoanData( 
        user.displayName, 
        borrower, 
        category,
        item, 
        date ? new Date(date).toDateString() : new Date().toDateString()
    );
    await interaction.reply({ content: 'Loan created!' });
};

const handleLoanReturn = async (interaction: ButtonInteraction<CacheType>) => {
    const { customId } = interaction;
    await deactivateLoanData(customId); 
    await interaction.reply({ content: 'Loan updated!' });
}
