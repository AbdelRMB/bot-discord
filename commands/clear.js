const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Supprimer un certain nombre de messages')
        .addIntegerOption(option =>
            option.setName('nombre')
                .setDescription('Le nombre de messages à supprimer')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(100)
        ),
    async execute(interaction) {
        try {
            const number = interaction.options.getInteger('nombre');
            const messages = await interaction.channel.messages.fetch({ limit: number });
            await interaction.channel.bulkDelete(messages);
            await interaction.reply({ content: `J'ai supprimé ${number} messages.`, ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Une erreur est survenue lors de la suppression des messages.', ephemeral: true });
        }
    }
};
