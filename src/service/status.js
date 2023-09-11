export async function status(interaction, gardeners) {

    const plantNameOption = interaction.options._hoistedOptions.find(option => option.name === 'plantname');
    const guildGardeners = gardeners[interaction.guildId]

    if (!plantNameOption) {
        await interaction.reply('Please provide the name of the plant to check its status.');
        return;
    }

    // Extract the plant name from the option
    const plantName = plantNameOption.value;

    const plant = guildGardeners.find(plant => plant.name = plantName);
    const plantIndex = guildGardeners.findIndex(plant => plant.name === plantName);

    if (plantIndex === -1) {
        // Plant not found, reply with an error message
        await interaction.reply(`Plant named "${plantName}" not found in your virtual garden.`);
        return;
    }
    await interaction.reply(`Status of the plant "${plant.name}": Growth: ${plant.growth.toFixed(2)}%, Health: ${plant.health}`);
}
export default async function (interaction, gardeners) {
    await status(interaction, gardeners);
}