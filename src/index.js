import dotenv from 'dotenv';

dotenv.config();

import { Client, GatewayIntentBits } from 'discord.js';
import commands from './commands.js';
const prefix = '/'; // You can change the command prefix if needed
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

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }
});
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'bolbol') {
        const emojisCache = interaction.guild.emojis.cache;
        const emojisArray = Array.from(emojisCache.values());
        console.log(emojisArray[0]);
        if (emojisArray.length === 0) {
            interaction.channel.send('No emojis or stickers found in this server.');
            return;
        }

        const randomEmoji = emojisArray[Math.floor(Math.random() * emojisArray.length)];
        interaction.channel.send(`${interaction.user.username} picked: ${randomEmoji}`);
    }
});

client.login(process.env.DISCORD_TOKEN);


