const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Warn a user in the server')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to warn')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for the warning')
                .setRequired(true)
        ),
    async execute(interaction) {
        try {
            const user = interaction.options.getUser('user');
            const reason = interaction.options.getString('reason');
            const member = await interaction.guild.members.fetch(user.id);

            await user.send(`You have been warned for: ${reason}`);

            await interaction.reply({ content: `${user.tag} has been warned for: ${reason}` });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'An error occurred while warning the user.', ephemeral: true });
        }
    }
};
