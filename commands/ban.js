const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a member from a server.')
        .addUserOption(option =>
            option.setName('Member')
                .setDescription('Member to ban.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for the ban.')
        ),
    async execute(interaction) {
        const user = interaction.options.getUser('membre');
        const reason = interaction.options.getString(' reason') || 'No reason provided.';

        const member = interaction.guild.members.cache.get(user.id);

        if (!member) {
            return interaction.reply({ content: 'This member is not on this server.', ephemeral: true });
        }

        if (!member.bannable) {
            return interaction.reply({ content: 'I cann\'t ban this member.', ephemeral: true });
        }

        await member.ban({ reason });
        await interaction.reply({ content: `Member ${user.tag} is ban. Reason : ${reason}` });
    }
};
