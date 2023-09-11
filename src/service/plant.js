export async function plant(interaction, gardeners) {
    const option = interaction.options._hoistedOptions.find(option => option.name === 'plantname');
    const plant = option;

    if (!gardeners[interaction.guildId]) {
        gardeners[interaction.guildId] = [];
    }

    // Simulate plant growth and health
    const plantData = {
        name: plant.value,
        growth: 0, // Simulate growth percentage
        health: 100, // Initial health points
    };
    const plantIndex = gardeners[interaction.guildId].findIndex(plant => plant.name === plantData.name);

    if (plantIndex !== -1) {
        // Plant not found, reply with an error message
        await interaction.reply(`Plant named "${plantData.name}" is already in your virtual garden.`);
        return;
    }


    gardeners[interaction.guildId].push(plantData);
    await interaction.reply(`You planted a ${plant.value} in your virtual garden!`);
}
export default async function (interaction, gardeners) {
    await plant(interaction, gardeners);
}