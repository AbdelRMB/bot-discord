const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a member from the server.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to kick')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for the kick')
        ),
    async execute(interaction) {
        try {
            const user = interaction.options.getUser('user');
            const reason = interaction.options.getString('reason') || 'No reason specified';

            const member = interaction.guild.members.cache.get(user.id);

            if (!member) {
                return interaction.reply({ content: 'This user is not in the server.', ephemeral: true });
            }

            if (!member.kickable) {
                return interaction.reply({ content: 'I cannot kick this user.', ephemeral: true });
            }

            await member.kick(reason);
            await interaction.reply({ content: `User ${user.tag} has been kicked. Reason: ${reason}` });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'An error occurred while trying to kick the user.', ephemeral: true });
        }
    }
};
