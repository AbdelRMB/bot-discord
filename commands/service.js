const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('service')
        .setDescription('Affiche un embed avec les services proposés'),
    async execute(interaction) {
        const servicesEmbed = {
            color: 0x4caf50, // Couleur principale (vert)
            title: '🌟 Services proposés',
            description: "Voici une liste des services que je propose :",
            fields: [
                {
                    name: '**\[01\]** \n\n🎨 UX/UI Design',
                    value: "Je conçois des interfaces utilisateur intuitives et esthétiques qui offrent une expérience utilisateur optimale. \n\n",
                },
                {
                    name: '**\[02\]** \n\n💻 Développement web',
                    value: "Vous avez besoin d'une application web moderne, responsive, épurée et attrayante ? Je suis là pour transformer vos idées en réalité. \n\n",
                },
                {
                    name: '**\[03\]** \n\n📱 Développement mobile',
                    value: "Je développe des applications mobiles performantes et accessibles sur iOS et Android. \n\n",
                },
                {
                    name: '**\[04\]** \n\n🚔 Développement FiveM/GMOD',
                    value: "Développement de scripts et ressources pour serveurs FiveM ou GMOD en Lua et JavaScript. \n\n",
                },
                {
                    name: '**\[05\]** \n\n🤖 Développement Bot Discord',
                    value: "Création de bots Discord fonctionnels, simples à utiliser, adaptés à vos besoins. \n\n",
                },
                {
                    name: '**\[06\]** \n\n🔧 Maintenance',
                    value: "Maintenance et amélioration continue de vos produits numériques. \n\n",
                }
            ],
            footer: {
                text: "N'hésitez pas à me contacter pour en savoir plus !",
            },
            timestamp: new Date(),
        };

        await interaction.reply({ embeds: [servicesEmbed] });
    },
};
