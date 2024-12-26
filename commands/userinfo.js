const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Displays information about a user')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user')
                .setRequired(false)
        ),
    async execute(interaction) {
        try {
            const user = interaction.options.getUser('user') || interaction.user;
            const member = await interaction.guild.members.fetch(user.id);
            const embed = {
                title: `${user.tag} Info`,
                fields: [
                    { name: 'ID', value: user.id, inline: true },
                    { name: 'Tag', value: user.tag, inline: true },
                    { name: 'Joined Server', value: member.joinedAt.toLocaleDateString(), inline: true },
                    { name: 'Account Created', value: user.createdAt.toLocaleDateString(), inline: true }
                ],
                color: 0x00ff00
            };
            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'An error occurred while fetching the user information.', ephemeral: true });
        }
    }
};
