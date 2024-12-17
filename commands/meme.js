const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Fetches a random meme from the internet'),
    async execute(interaction) {
        try {
            const response = await fetch('https://meme-api.com/gimme');
            const meme = await response.json();

            await interaction.reply({ content: meme.url });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'An error occurred while fetching the meme.', ephemeral: true });
        }
    }
};
