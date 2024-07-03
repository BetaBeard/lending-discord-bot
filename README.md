# Loan management bot with Discord.js

A little bot to create item loans using [discord.js](https://github.com/discordjs/discord.js) and [MongoDB](https://www.mongodb.com/).

## Pre-requisites

Before starting the bot there's some requirements first:

- Node.js version 20.*, you can install it from their official page [here](https://nodejs.org/en)
- Yarn for package management, you can install it like:
> npm install -g yarn
- Typescript for our code:
> yarn add -g typescript
- A MongoDB Atlas account with a personal cluster, you can follow this [tutorial](https://www.freecodecamp.org/news/get-started-with-mongodb-atlas/)
- A Discord bot application, you can follow this [tutorial](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot). Remember to save your token as you will need it to run our bot. Once you have a bot application you have to add it to a server and give it permissions, click the "OAuth2" option on the sidebar, then select "URL Generator". Under "Scopes", select bot and application.commands. The bot scope allows your bot account to join the server, and the application.commands scope allows you to update the slash commands. When you select bot, a new section for "Bot Permissions" will appear, select "Send messages" and "Read messages". Copy the generated URL, and paste it into your browser. This will take you through Discord's process to add your new bot to a server.
- Once you have your Discord bot token and your MongoDB connection string, duplicate the orginal.env file in the root of the project and rename it to .env, put your bot token in DISCORD_TOKEN and your DB connection string in MONGO_URI
- Finally, install the rest of our dependencies, in the root of the project run:
> yarn install

## Running the bot

Once you've completed all the pre-requisites you start up the bot and use it in the Discord server of your choice, to do this simply run in the root of the project:
> yarn start

This command will transpile your ts files and start the bot, and if everything goes right you'll see three messages in your terminal:
> Bot is starting...

> Database Connected!

> lending-bot is online

After this you can start using the bot.

## Available bot commands

There are currently three available commands to use:
- /addloan this will let you create new loans in your DB
- /activeloans will retrieve all active loans in your DB, and allow you to pay them off 
- /paidoffloans will retrieve all paid off loans