const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create-ticket')
        .setDescription('Crée un système de tickets pour gérer les demandes utilisateurs'),
    async execute(interaction) {
        const ticketCategoryName = 'Tickets'; // Nom de la catégorie pour les tickets

        // Vérifie si la catégorie existe déjà
        let category = interaction.guild.channels.cache.find(
            c => c.name === ticketCategoryName && c.type === 4 // Type 4 pour les catégories
        );

        if (!category) {
            category = await interaction.guild.channels.create({
                name: ticketCategoryName,
                type: 4, // Type pour les catégories
            });
        }

        const ticketChannel = await interaction.guild.channels.create({
            name: `ticket-${interaction.user.username}`,
            type: 0, // Type pour un salon textuel
            parent: category.id, // Définit la catégorie comme parent
            permissionOverwrites: [
                {
                    id: interaction.guild.id, // Tout le serveur
                    deny: [PermissionFlagsBits.ViewChannel], // Empêche les autres membres de voir le ticket
                },
                {
                    id: interaction.user.id, // L'utilisateur qui a créé le ticket
                    allow: [
                        PermissionFlagsBits.ViewChannel,
                        PermissionFlagsBits.SendMessages,
                        PermissionFlagsBits.ReadMessageHistory,
                    ],
                },
            ],
        });

        await ticketChannel.send({
            content: `Bonjour ${interaction.user}, un membre de l'équipe vous répondra bientôt. Merci de préciser votre demande !`,
        });

        await interaction.reply({
            content: `Votre ticket a été créé : ${ticketChannel}`,
            ephemeral: true,
        });
    },
};
