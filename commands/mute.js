const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mute a user in the server')
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to mute')
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('duration')
                .setDescription('Duration of mute in minutes (optional)')
                .setRequired(false)
        ),
    async execute(interaction) {
        try {
            const user = interaction.options.getUser('user');
            const member = await interaction.guild.members.fetch(user.id);
            const duration = interaction.options.getInteger('duration') || null;

            const muteRole = interaction.guild.roles.cache.find(role => role.name === 'Muted');
            if (!muteRole) {
                await interaction.guild.roles.create({
                    name: 'Muted',
                    permissions: [],
                    reason: 'Muted role created',
                });
            }
            await member.roles.add(muteRole);

            if (duration) {
                setTimeout(() => {
                    member.roles.remove(muteRole);
                }, duration * 60 * 1000);
            }

            await interaction.reply({ content: `${user.tag} has been muted.` });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'An error occurred while muting the user.', ephemeral: true });
        }
    }
};
