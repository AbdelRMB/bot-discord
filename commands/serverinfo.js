const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Displays information about the server')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        try {
            const guild = interaction.guild;
            const owner = await guild.fetchOwner(); 

            const serverInfo = {
                color: 0x00ff00,
                title: `Information about ${guild.name}`,
                fields: [
                    { name: 'Server Name', value: guild.name, inline: true },
                    { name: 'Total Members', value: `${guild.memberCount}`, inline: true },
                    { name: 'Owner', value: `${owner.user.tag}`, inline: true },
                    { name: 'Creation Date', value: guild.createdAt.toDateString(), inline: true },
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
