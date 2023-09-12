import waterPlant from "../db/waterPlant.js";

const COOLDOWN_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

async function checkCooldown(gardeners) {
    if (gardeners.lastWateredTimestamps) {
        const lastWateredTime = gardeners.lastWateredTimestamps;
        const currentTime = Date.now();

        if (currentTime - lastWateredTime < COOLDOWN_DURATION) {
            // User is on cooldown, reply with a message
            const remainingCooldown = Math.ceil((COOLDOWN_DURATION - (currentTime - lastWateredTime)) / 1000);
            return `You are on cooldown. Please wait ${remainingCooldown} seconds before watering another plant.`;
        }
    }
    return null;
}

async function waterPlantAndUpdateGardener(gardeners, plantIndex) {
    // Simulate plant growth by increasing the growth percentage (e.g., by 10%)
    gardeners.plants[plantIndex].growth += 10;
    gardeners.lastWateredTimestamps = Date.now();
    await waterPlant(gardeners);
}

export async function water(interaction, gardeners) {
    const plantNameOption = interaction.options._hoistedOptions.find(option => option.name === 'plantname');

    if (!plantNameOption) {
        await interaction.reply('Please provide the name of the plant to water.');
        return;
    }

    // Extract the plant name from the option
    const plantName = plantNameOption.value;
    const cooldownMessage = await checkCooldown(gardeners);

    if (cooldownMessage) {
        await interaction.reply(cooldownMessage);
        return;
    }

    const plantIndex = gardeners.plants.findIndex(p => p.name === plantName);

    if (plantIndex === -1) {
        // Plant not found, reply with an error message
        await interaction.reply(`Plant named "${plantName}" not found in your virtual garden.`);
        return;
    }

    await waterPlantAndUpdateGardener(gardeners, plantIndex);
    await interaction.reply(`You watered the plant named "${plantName}"!`);
}

export default async function (interaction, gardeners) {
    await water(interaction, gardeners);
}
