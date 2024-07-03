// Load environment variables from .env file
require('dotenv').config();

import { Client } from "discord.js";
import ready from "./listeners/ready";
import interactionCreate from "./listeners/interactionCreate";
import { connectDatabase } from "./connectDatabase";

// Anonymous async function to start the bot
(async () => {
    try {
        const token = process.env.DISCORD_TOKEN; // Discord bot token obtained from environment variables
    
        console.log("Bot is starting...");
        
        // Create a new Discord client instance
        const client = new Client({
            intents: [] // Intents can be specified here if needed
        });
        
        // Register event listeners
        ready(client); // Register 'ready' event handler
        interactionCreate(client); // Register 'interactionCreate' event handler
        
        // Connect to the database
        await connectDatabase();
        
        // Log in to Discord using the bot token
        await client.login(token);

        console.log(`Logged in as ${client.user?.tag}`);
        
    } catch(error) {
        console.error('Unexpected error in bot!!', error);
    }
})();
