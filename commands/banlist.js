const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('banlist')
        .setDescription('Displays the list of banned users in the server')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    async execute(interaction) {
        try {
            const bans = await interaction.guild.bans.fetch();
            const bannedUsers = bans.map(ban => ban.user.tag).join(', ');

            if (!bannedUsers) {
                await interaction.reply({ content: 'No banned users found.', ephemeral: true });
            } else {
                await interaction.reply({ content: `Banned users: ${bannedUsers}` });
            }
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'An error occurred while fetching the ban list.', ephemeral: true });
        }
    }
};
