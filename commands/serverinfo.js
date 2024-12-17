const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Affiche des informations sur le serveur'),
    async execute(interaction) {
        try {
            const guild = interaction.guild;
            const embed = {
                title: `${guild.name} Info`,
                fields: [
                    { name: 'Server ID', value: guild.id, inline: true },
                    { name: 'Members', value: `${guild.memberCount}`, inline: true },
                    { name: 'Region', value: guild.preferredLocale, inline: true },
                    { name: 'Created At', value: guild.createdAt.toLocaleDateString(), inline: true }
                ],
                color: 0x00ff00
            };
            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Une erreur est survenue.', ephemeral: true });
        }
    }
};
