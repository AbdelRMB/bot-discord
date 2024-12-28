const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create-ticket')
        .setDescription('Crée un système de tickets pour gérer les demandes utilisateurs')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        try{

            const ticketdevEmbed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle('Ticket Service')
                .setDescription('Choisissez le service demander');
    
            const ticketdevButtons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('ticket_dev_web')
                        .setLabel('Developpement Web')
                        .setStyle(ButtonStyle.Primary)
                        .setEmoji('🛠️'),
                    new ButtonBuilder()
                        .setCustomId('ticket_dev_app')
                        .setLabel('Developpement Application')
                        .setStyle(ButtonStyle.Secondary)
                        .setEmoji(':calling:')
                );
    
            await interaction.reply({ embeds: [ticketdevEmbed], components: [ticketdevButtons] });
        } catch (error) { 
            console.error('Error while creating ticket:', error);
            await interaction.reply({ content: 'An error occurred while creating the ticket.', ephemeral: true });
        }
    },
};
