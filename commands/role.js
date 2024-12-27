const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('Créer un message pour les rôles avec des réactions')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        try {
            const roleEmbed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle('Choisis ton rôle !')
                .setDescription(
                    'Réagis avec les emojis suivants pour obtenir un rôle :\n' +
                    '🛠️ - Développeur\n' +
                    '🎨 - Graphiste'
                );

            const message = await interaction.channel.send({ embeds: [roleEmbed] });

            const roleMessageData = {
                messageId: message.id,
                roles: {
                    '🛠️': 'Développeur',
                    '🎨': 'Graphiste'
                }
            };

            fs.writeFileSync('./roleMessage.json', JSON.stringify(roleMessageData, null, 2));

            await interaction.reply({ content: 'Message de rôle créé et sauvegardé.', ephemeral: true });

            await message.react('🛠️');
            await message.react('🎨');
        } catch (error) {
            console.error('Erreur lors de la création du message des rôles :', error);
            await interaction.reply({ content: "Une erreur s'est produite lors de la création du message des rôles.", ephemeral: true });
        }
    }
};
