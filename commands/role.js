const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');
const config = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('Créer un message pour les rôles avec des boutons')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        try {
            const roleEmbed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle('Choisis ton rôle !')
                .setDescription(
                    'Clique sur un bouton ci-dessous pour obtenir le rôle correspondant :\n' +
                    '🛠️ - Développeur\n' +
                    '🎨 - Graphiste'
                );

            const buttons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('developer_role')
                        .setLabel('Développeur')
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji('🛠️'),
                    new ButtonBuilder()
                        .setCustomId('designer_role')
                        .setLabel('Graphiste')
                        .setStyle(ButtonStyle.Success)
                        .setEmoji('🎨')
                );

            await interaction.reply({ embeds: [roleEmbed], components: [buttons] });
        } catch (error) {
            console.error('Erreur lors de la création du message des rôles :', error);
            await interaction.reply({ content: "Une erreur s'est produite lors de la création du message des rôles.", ephemeral: true });
        }
    },
};
