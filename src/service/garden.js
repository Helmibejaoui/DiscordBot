export async function garden(interaction, gardeners) {
    const guildGardeners = gardeners[interaction.guildId] || [];

    if (guildGardeners.length === 0) {
        interaction.reply('Your virtual garden is empty.');
    } else {
        // Display the user's virtual garden with growth and health status
        const gardenMessage = guildGardeners.map((plant) => {
            return `${plant.name}: Growth: ${plant.growth.toFixed(2)}%, Health: ${plant.health}`;
        }).join('\n');

        await interaction.reply(`Your virtual garden contains:\n${gardenMessage}`);
    }
}
export default async function (interaction, gardeners) {
    await garden(interaction, gardeners);
}
