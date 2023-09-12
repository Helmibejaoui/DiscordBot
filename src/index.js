import dotenv from 'dotenv';

dotenv.config();

import { Client, GatewayIntentBits } from 'discord.js';

import commands from './commands/commands.js';
import plant from './service/plant.js';
import garden from './service/garden.js';
import water from './service/water.js';
import getGarden from './db/getGarden.js';


 
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent
    ]
});

commands();

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand() || interaction.user.bot) return;

    const gardeners=await getGarden(interaction.guildId);

    if (interaction.commandName === 'plant') {
        plant(interaction, gardeners);

    } else if (interaction.commandName === 'garden') {
        garden(interaction, gardeners);

    } else if (interaction.commandName === 'water') {
        water(interaction, gardeners);

    } else if (interaction.commandName === 'status') {
        status(interaction, gardeners);

    }
});
client.login(process.env.DISCORD_TOKEN);
