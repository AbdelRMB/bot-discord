const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');
const config = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rules')
        .setDescription('Affiche un embed avec les règles du serveur et un bouton de vérification')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const rulesEmbed = new EmbedBuilder()
            .setColor(0x3498db)
            .setTitle('Règles du serveur')
            .setDescription("Bienvenue sur notre serveur ! Voici les règles à respecter pour maintenir une bonne ambiance :")
            .addFields(
                { name: '1. Respect', value: "Soyez respectueux envers les autres membres. Aucune forme de harcèlement, d'insulte ou de comportement toxique ne sera tolérée." },
                { name: '2. Pas de spam', value: "Évitez de spammer dans les salons textuels ou vocaux. Cela inclut les messages répétitifs et les mentions abusives." },
                { name: '3. Contenus inappropriés', value: "Ne partagez pas de contenus NSFW, offensants ou illégaux sous quelque forme que ce soit." },
                { name: '4. Suivez les consignes des modérateurs', value: "Les modérateurs sont là pour assurer le bon fonctionnement du serveur. Respectez leurs décisions." },
                { name: '5. Canaux dédiés', value: "Utilisez les salons appropriés pour vos messages. Par exemple, les discussions générales vont dans le canal général, les questions techniques dans le canal dédié, etc." },
                { name: '6. Pas de publicité', value: "La publicité pour d'autres serveurs ou services est interdite sans l'accord préalable d'un administrateur." },
                { name: 'Règles officielles de Discord', value: "En rejoignant ce serveur, vous acceptez également de respecter les [Conditions d'utilisation](https://discord.com/terms) et les [Règles communautaires](https://discord.com/guidelines). Tout manquement peut entraîner une action de modération." }
            )
            .setFooter({ text: "Merci de respecter ces règles pour maintenir une communauté agréable pour tous !" })
            .setTimestamp();

        const verificationButton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('verify_member')
                    .setLabel('✅ Vérification')
                    .setStyle(ButtonStyle.Success)
            );

        await interaction.reply({ embeds: [rulesEmbed], components: [verificationButton] });
    },
};