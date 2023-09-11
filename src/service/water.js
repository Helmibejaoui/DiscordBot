const lastWateredTimestamps = {};
export async function water(interaction, gardeners) {
    const plantNameOption = interaction.options._hoistedOptions.find(option => option.name === 'plantname');
    const guildId = interaction.guildId;

    if (!plantNameOption) {
        await interaction.reply('Please provide the name of the plant to water.');
        return;
    }

    // Extract the plant name from the option
    const plantName = plantNameOption.value;
    // Check if the user has recently watered a plant in this guild
    if (lastWateredTimestamps[guildId]) {
        const lastWateredTime = lastWateredTimestamps[guildId];
        const currentTime = Date.now();
        const cooldownDuration = 5 * 60 * 1000; // 5 minutes in milliseconds

        if (currentTime - lastWateredTime < cooldownDuration) {
            // User is on cooldown, reply with a message
            const remainingCooldown = Math.ceil((cooldownDuration - (currentTime - lastWateredTime)) / 1000);
            await interaction.reply(`You are on cooldown. Please wait ${remainingCooldown} seconds before watering another plant.`);
            return;
        }
    }
    const plantIndex = gardeners[guildId].findIndex(plant => plant.name === plantName);

    if (plantIndex === -1) {
        // Plant not found, reply with an error message
        await interaction.reply(`Plant named "${plantName}" not found in your virtual garden.`);
        return;
    }

    // Simulate plant growth by increasing the growth percentage (e.g., by 10%)
    gardeners[guildId][plantIndex].growth += 10;
    if (!lastWateredTimestamps[guildId]) {
        lastWateredTimestamps[guildId] = {};
    }
    lastWateredTimestamps[guildId] = Date.now();
    await interaction.reply(`You watered the plant named "${plantName}"!`);
}

export default async function (interaction, gardeners) {
    await water(interaction, gardeners);
}
