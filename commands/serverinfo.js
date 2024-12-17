const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Displays information about the server'),
    async execute(interaction) {
        try {
            const guild = interaction.guild;

            const serverInfo = {
                color: 0x00ff00,
                title: `Information about ${guild.name}`,
                fields: [
                    { name: 'Server Name', value: guild.name, inline: true },
                    { name: 'Total Members', value: `${guild.memberCount}`, inline: true },
                    { name: 'Owner', value: `${guild.owner.user.tag}`, inline: true },
                    { name: 'Creation Date', value: guild.createdAt.toDateString(), inline: true },
                    { name: 'Region', value: guild.region, inline: true },
                ],
                thumbnail: { url: guild.iconURL({ dynamic: true }) },
            };

            await interaction.reply({ embeds: [serverInfo] });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'An error occurred while fetching the server info.', ephemeral: true });
        }
    }
};