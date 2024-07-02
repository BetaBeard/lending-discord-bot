import { Client, Events } from "discord.js";
import { Commands } from "../commands";

export default (client: Client): void => {
    client.on(Events.ClientReady, async () => {
        if (!client.user || !client.application) {
            throw new Error('No user or app');
        }

        // Register commands to use by the bot 
        await client.application.commands.set(Commands);

        console.log(`${client.user.username} is online`);
    });
};