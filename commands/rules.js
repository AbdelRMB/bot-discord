const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rules')
        .setDescription('Affiche un embed avec les règles du serveur')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const rulesEmbed = {
            color: 0x3498db,
            title: 'Règles du serveur',
            description: "Bienvenue sur notre serveur ! Voici les règles à respecter pour maintenir une bonne ambiance :",
            fields: [
                {
                    name: '1. Respect',
                    value: "Soyez respectueux envers les autres membres. Aucune forme de harcèlement, d'insulte ou de comportement toxique ne sera tolérée.",
                },
                {
                    name: '2. Pas de spam',
                    value: "Évitez de spammer dans les salons textuels ou vocaux. Cela inclut les messages répétitifs et les mentions abusives.",
                },
                {
                    name: '3. Contenus inappropriés',
                    value: "Ne partagez pas de contenus NSFW, offensants ou illégaux sous quelque forme que ce soit.",
                },
                {
                    name: '4. Suivez les consignes des modérateurs',
                    value: "Les modérateurs sont là pour assurer le bon fonctionnement du serveur. Respectez leurs décisions.",
                },
                {
                    name: '5. Canaux dédiés',
                    value: "Utilisez les salons appropriés pour vos messages. Par exemple, les discussions générales vont dans le canal général, les questions techniques dans le canal dédié, etc.",
                },
                {
                    name: '6. Pas de publicité',
                    value: "La publicité pour d'autres serveurs ou services est interdite sans l'accord préalable d'un administrateur.",
                },
                {
                    name: 'Règles officielles de Discord',
                    value: "En rejoignant ce serveur, vous acceptez également de respecter les [Conditions d'utilisation](https://discord.com/terms) et les [Règles communautaires](https://discord.com/guidelines) de Discord. Tout manquement peut entraîner une action de modération."
                }
            ],
            footer: {
                text: "Merci de respecter ces règles pour maintenir une communauté agréable pour tous !",
            },
            timestamp: new Date(),
        };

        await interaction.reply({ embeds: [rulesEmbed] });
    },
};
