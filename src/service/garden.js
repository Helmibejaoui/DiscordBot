async function displayGardenStatus(interaction, gardeners) {
    if (gardeners.plants.length === 0) {
        return interaction.reply('Your virtual garden is empty.');
    }

    const gardenMessage = gardeners.plants.map((plant) => {
        return `${plant.name}: Growth: ${plant.growth.toFixed(2)}%, Health: ${plant.health}`;
    }).join('\n');

    return interaction.reply(`Your virtual garden contains:\n${gardenMessage}`);
}

export async function garden(interaction, gardeners) {
    await displayGardenStatus(interaction, gardeners);
}

export default garden;
