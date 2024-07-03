import { Client, Events } from "discord.js";
import { Commands } from "../commands";

// Default export function to handle the client ready event
export default (client: Client): void => {
    client.on(Events.ClientReady, async () => {
        // Ensure the client user and application are available
        if (!client.user || !client.application) {
            throw new Error('No user or app');
        }

        // Register commands to be used by the bot
        await client.application.commands.set(Commands);

        // Log a message indicating the bot is online
        console.log(`${client.user.username} is online`);
    });
};
