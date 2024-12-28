const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create-ticket')
        .setDescription('Crée un système de tickets pour gérer les demandes utilisateurs')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        try {
            const channel = interaction.options.getChannel('channel') || interaction.channel;

            if (!channel || channel.type !== ChannelType.GuildText) {
                await interaction.reply({ content: 'The specified channel is not a text channel.', ephemeral: true });
                return;
            }

            const ticketdevEmbed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle('Ticket client')
                .setDescription('Choisissez le service demander afin de pouvoir être bien redirigé et obtenir une réponse rapide.');

            const ticketdevButtons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('ticket_dev_web')
                        .setLabel('Developpement Web')
                        .setStyle(ButtonStyle.Secondary)
                        .setEmoji('🛠️'),
                    new ButtonBuilder()
                        .setCustomId('ticket_dev_app')
                        .setLabel('Developpement Application')
                        .setStyle(ButtonStyle.Secondary)
                        .setEmoji('📲') 
                );

            await channel.send({ embeds: [ticketdevEmbed], components: [ticketdevButtons] });

            const ticketbugEmbed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle('Ticket Support')
                .setDescription('Ouvrir un ticket Support aifn de pouvoir être mis en relation avec un expert du Support.');

            const ticketbugButtons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('ticket_bug')
                        .setLabel('Ouvrir un ticket Support')
                        .setStyle(ButtonStyle.Danger)
                        .setEmoji('👨‍💻')  
                );

            await channel.send({ embeds: [ticketbugEmbed], components: [ticketbugButtons] });

            await interaction.reply({ content: 'Panels créés !', ephemeral: true });
        } catch (error) {
            console.error('Error while creating ticket:', error);
            await interaction.reply({ content: 'An error occurred while creating the ticket.', ephemeral: true });
        }
    },
};
