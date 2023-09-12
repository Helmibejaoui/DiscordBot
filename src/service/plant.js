import addPlant from "../db/addPlant.js";

export async function plant(interaction, gardeners) {
    const plantName = interaction.options._hoistedOptions.find(option => option.name === 'plantname').value;
    if (gardeners.plants.find((p => p.name === plantName))) {
        await interaction.reply(`${plantName} is already in your virtual garden!`);
        return;
    }

    // Simulate plant growth and health 
    const plantData = {
        name: plantName,
        growth: 0,
        health: 100,
    };

    gardeners.plants.push(plantData);
    try {
        await addPlant(gardeners);
        await interaction.reply(`You planted a ${plantName} in your virtual garden!`);
    } catch (err) { console.error(`Something went wrong planting in your garden: ${err}\n`); }
}

export default async function plantGarden(interaction, gardeners) {
    await plant(interaction, gardeners);
}