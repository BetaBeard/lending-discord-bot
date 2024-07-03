 import { CommandInteraction, ChatInputApplicationCommandData } from "discord.js";

// Defines the structure of every command
// Adds run property for command execution
export interface ICommand extends ChatInputApplicationCommandData {
    run: (interaction: CommandInteraction) => Promise<void>;
}