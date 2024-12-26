const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reglement-service')
        .setDescription('Affiche un embed avec les modalités et règles sur les services proposés'),
    async execute(interaction) {
        const reglementServiceEmbed = {
            color: 0xff5722, // Couleur principale (orange)
            title: '📜 Modalités et Règles des Services',
            description: "Voici les modalités et règles concernant les services proposés :",
            fields: [
                {
                    name: '1. Engagements',
                    value: "Tous les services fournis sont réalisés dans les délais convenus. Toute modification importante après validation initiale pourra entraîner des frais supplémentaires.",
                },
                {
                    name: '2. Paiements',
                    value: "Le paiement doit être effectué avant la livraison finale du service. Des acomptes peuvent être demandés pour les projets de grande envergure.",
                },
                {
                    name: '3. Confidentialité',
                    value: "Toutes les informations échangées dans le cadre des services sont strictement confidentielles et ne seront jamais partagées sans consentement préalable.",
                },
                {
                    name: '4. Révisions',
                    value: "Des révisions sont possibles dans la limite de 2 modifications majeures après la livraison initiale. Au-delà, des frais peuvent s'appliquer.",
                },
                {
                    name: '5. Limites des services',
                    value: "Les services proposés respectent les lois en vigueur. Aucun projet illégal ou contraire aux règles de la communauté ne sera accepté.",
                },
                {
                    name: '6. Respect des délais',
                    value: "Les délais seront respectés sauf en cas de force majeure. Le client sera informé immédiatement en cas de retard imprévu.",
                }
            ],
            footer: {
                text: "Merci de lire attentivement ces modalités avant de solliciter un service !",
            },
            timestamp: new Date(),
        };

        await interaction.reply({ embeds: [reglementServiceEmbed] });
    },
};
