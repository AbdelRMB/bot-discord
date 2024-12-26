const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');
const config = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('close')
        .setDescription('Supprime un salon de ticket (réservé aux administrateurs)')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), 
    async execute(interaction) {
        try {
            const channel = interaction.channel;

            if (!channel || channel.type !== ChannelType.GuildText) {
                await interaction.reply({
                    content: "Cette commande ne peut être utilisée que dans un salon textuel.",
                    ephemeral: true,
                });
                return;
            }

            const logChannel = message.guild.channels.cache.get(config.logChannelId);

            if (logChannel) {
                await logChannel.send(`Le salon ${channel.name} a été supprimé par ${interaction.user.tag}.`);
            }

            await interaction.reply({
                content: `Le salon ${channel.name} est en cours de suppression.`,
                ephemeral: true,
            });

            await channel.delete();
        } catch (error) {
            console.error('Erreur lors de l\'exécution de la commande close :', error);
            if (!interaction.replied) {
                await interaction.reply({
                    content: "Une erreur s'est produite lors de la tentative de suppression du salon.",
                    ephemeral: true,
                });
            }
        }
    },
};
