const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('announce')
        .setDescription('Envoie une annonce dans un canal spécifié')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Le canal où envoyer l\'annonce')
                .setRequired(true)
                .addChannelTypes(0, 5))  // Text channels only
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Le message de l\'annonce')
                .setRequired(true)
        ),
    async execute(interaction) {
        try {
            const channel = interaction.options.getChannel('channel');
            const message = interaction.options.getString('message');
            await channel.send(message);
            await interaction.reply({ content: `Annonce envoyée dans ${channel.name}.`, ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Une erreur est survenue lors de l\'envoi de l\'annonce.', ephemeral: true });
        }
    }
};
