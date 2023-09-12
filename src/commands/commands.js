
import dotenv from 'dotenv';

dotenv.config();

import { REST, Routes } from 'discord.js';

async function commands() {
    const commands = [
        {
            name: 'plant',
            description: "Plant with growth and health properties is added to the user's virtual garden",
            options: [
                {
                    name: 'plantname',
                    type: 3, // Argument type
                    description: 'Name of the plant.',
                    required: true, // Make the argument required
                },
            ],
        },
        {
            name: 'water',
            description: 'Water the garden',
            options: [
                {
                    name: 'plantname',
                    type: 3, // Argument type
                    description: 'Name of the plant.',
                    required: true, // Make the argument required
                },
            ],
        },
        {
            name: 'garden',
            description: "displays the user's virtual garden, including the growth percentage and health of each plant.",
        },
    ];

    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}

export default commands;
