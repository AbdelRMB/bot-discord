const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Affiche des informations sur un utilisateur')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('L\'utilisateur')
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
            await interaction.reply({ content: 'Une erreur est survenue.', ephemeral: true });
        }
    }
};
