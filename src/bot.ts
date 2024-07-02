require('dotenv').config();
import { Client } from "discord.js";
import ready from "./listeners/ready";
import interactionCreate from "./listeners/interactionCreate";
import { connectDatabase } from "./connectDatabase";

(async () => {
    try {
        const token = process.env.DISCORD_TOKEN; // add your token here
    
        console.log("Bot is starting...");
        
        const client = new Client({
            intents: []
        });
        
        // Register event listeners
        ready(client);
        interactionCreate(client);
        
        await connectDatabase();
        await client.login(token);

    } catch(error) {
        console.error('Unexpected error in bot!!')
    }
})();