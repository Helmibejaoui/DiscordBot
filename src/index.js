import dotenv from 'dotenv';

dotenv.config();

import { Client, GatewayIntentBits } from 'discord.js';
const prefix = '/'; // You can change the command prefix if needed
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent
    ]
});
client.login(process.env.DISCORD_TOKEN);
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
    console.log(message.content);
    if (message.content === `${prefix}bolbol`) {
        // Get a random emoji or sticker from the server
        const emojisCache = message.guild.emojis.cache;
        const emojisArray = Array.from(emojisCache.values());
        console.log(emojisArray[0]);
        if (emojisArray.length === 0) {
            message.channel.send('No emojis or stickers found in this server.');
            return;
        }
        
        const randomEmoji = emojisArray[Math.floor(Math.random() * emojisArray.length)];
        message.channel.send(`${message.author.username} picked: ${randomEmoji}`);
    }
});


