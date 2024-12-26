const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unmute')
        .setDescription('Unmute a user in the server')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to unmute')
                .setRequired(true)
        ),
    async execute(interaction) {
        try {
            const user = interaction.options.getUser('user');
            const member = await interaction.guild.members.fetch(user.id);

            // Apply unmute
            const muteRole = interaction.guild.roles.cache.find(role => role.name === 'Muted');
            if (muteRole) {
                await member.roles.remove(muteRole);
            }

            await interaction.reply({ content: `${user.tag} has been unmuted.` });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'An error occurred while unmuting the user.', ephemeral: true });
        }
    }
};
