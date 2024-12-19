const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rules')
        .setDescription('Creates an interactive set of rules.'),
    async execute(interaction) {
        try {
            // Demande du titre
            await interaction.reply('What is the title of the rules?');
            
            // Filtre pour s'assurer que c'est bien l'utilisateur qui a lancé la commande qui répond
            const filter = (response) => response.author.id === interaction.user.id;

            // Collecte la première réponse (le titre des règles)
            const collector = interaction.channel.createMessageCollector({ filter, max: 1, time: 60000 });

            collector.on('collect', async (message) => {
                const title = message.content;
                await interaction.followUp(`The title is "${title}". How many rules are there? (Please respond with a number)`);

                // Collecte la réponse concernant le nombre de règles
                const ruleCountCollector = interaction.channel.createMessageCollector({ filter, max: 1, time: 60000 });

                ruleCountCollector.on('collect', async (msg) => {
                    const ruleCount = parseInt(msg.content);

                    // Validation du nombre de règles
                    if (isNaN(ruleCount) || ruleCount <= 0) {
                        await interaction.followUp('The number of rules must be a positive number. Command cancelled.');
                        return;
                    }

                    const rules = [];
                    let currentRule = 1;

                    // Fonction pour demander chaque règle
                    const askForRule = async () => {
                        await interaction.followUp(`What is rule ${currentRule}?`);
                        const ruleCollector = interaction.channel.createMessageCollector({ filter, max: 1, time: 60000 });

                        ruleCollector.on('collect', async (ruleMessage) => {
                            rules.push(ruleMessage.content);
                            currentRule++;

                            // Si nous avons encore des règles à recueillir
                            if (currentRule <= ruleCount) {
                                askForRule();
                            } else {
                                // Lorsque toutes les règles sont collectées, on affiche le résultat
                                const embed = {
                                    color: 0x00ff00,
                                    title: title,
                                    description: rules.map((rule, index) => `**Rule ${index + 1}**: ${rule}`).join('\n'),
                                };

                                await interaction.followUp({ embeds: [embed] });
                            }
                        });

                        ruleCollector.on('end', (collected, reason) => {
                            if (reason === 'time' && currentRule <= ruleCount) {
                                interaction.followUp('Time expired, command cancelled.');
                            }
                        });
                    };

                    askForRule();
                });

                ruleCountCollector.on('end', (collected, reason) => {
                    if (reason === 'time') {
                        interaction.followUp('Time expired, command cancelled.');
                    }
                });
            });

            collector.on('end', (collected, reason) => {
                if (reason === 'time') {
                    interaction.followUp('Time expired, command cancelled.');
                }
            });
        } catch (error) {
            console.error('Error executing the /rules command:', error);
            await interaction.followUp({ content: 'An error occurred while creating the rules.', ephemeral: true });
        }
    },
};
