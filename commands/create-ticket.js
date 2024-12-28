const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create-ticket')
        .setDescription('Crée un système de tickets pour gérer les demandes utilisateurs')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');

        const ticketdevEmbed = new EmbedBuilder()
            .setColor(0x00FF00)
            .setTitle('Ticket client')
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

        await channel.send({ embeds: [ticketdevEmbed], components: [ticketdevButtons] });

        const ticketbugEmbed = new EmbedBuilder()
            .setColor(0x00FF00)
            .setTitle('Ticket Support')
            .setDescription('Ouvrir un ticket Support.');

        const ticketbugButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('ticket_bug')
                    .setLabel('Signaler un bug')
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji(':technologist:')
            );

        await channel.send({ embeds: [ticketbugEmbed], components: [ticketbugButtons] });

        await interaction.reply({ content: 'Panels créer !', ephemeral: true });


        // const ticketCategoryName = 'Tickets'; 

        // let category = interaction.guild.channels.cache.find(
        //     c => c.name === ticketCategoryName && c.type === 4 
        // );

        // if (!category) {
        //     category = await interaction.guild.channels.create({
        //         name: ticketCategoryName,
        //         type: 4,
        //     });
        // }

        // const ticketChannel = await interaction.guild.channels.create({
        //     name: `ticket-${interaction.user.username}`,
        //     type: 0, 
        //     parent: category.id, 
        //     permissionOverwrites: [
        //         {
        //             id: interaction.guild.id, 
        //             deny: [PermissionFlagsBits.ViewChannel], 
        //         },
        //         {
        //             id: interaction.user.id, 
        //             allow: [
        //                 PermissionFlagsBits.ViewChannel,
        //                 PermissionFlagsBits.SendMessages,
        //                 PermissionFlagsBits.ReadMessageHistory,
        //             ],
        //         },
        //     ],
        // });

        // await ticketChannel.send({
        //     content: `Bonjour ${interaction.user}, un membre de l'équipe vous répondra bientôt. Merci de préciser votre demande !`,
        // });

        // await interaction.reply({
        //     content: `Votre ticket a été créé : ${ticketChannel}`,
        //     ephemeral: true,
        // });
    },
};
