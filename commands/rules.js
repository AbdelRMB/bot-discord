const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rules')
        .setDescription('Creates an interactive set of rules.'),
    async execute(interaction) {
        try {
            const messagesToDelete = [];

            const initialMessage = await interaction.reply({ content: 'What is the title of the rules?', fetchReply: true });
            messagesToDelete.push(initialMessage);

            const filter = (response) => response.author.id === interaction.user.id;

            const titleMessage = await interaction.channel.awaitMessages({ filter, max: 1, time: 60000 });
            if (!titleMessage.size) {
                return interaction.followUp('Time expired. Command cancelled.');
            }

            const title = titleMessage.first();
            messagesToDelete.push(title);

            const followUpMessage = await interaction.followUp({ content: `The title is "${title.content}". How many rules are there? (Please respond with a number)`, fetchReply: true });
            messagesToDelete.push(followUpMessage);

            const ruleCountMessage = await interaction.channel.awaitMessages({ filter, max: 1, time: 60000 });

            if (!ruleCountMessage.size) {
                return interaction.followUp('Time expired. Command cancelled.');
            }

            const ruleCount = parseInt(ruleCountMessage.first().content);
            messagesToDelete.push(ruleCountMessage.first());

            if (isNaN(ruleCount) || ruleCount <= 0) {
                return interaction.followUp('The number of rules must be a positive number. Command cancelled.');
            }

            const rules = [];

            for (let i = 1; i <= ruleCount; i++) {
                const rulePrompt = await interaction.followUp({ content: `What is rule ${i}?`, fetchReply: true });
                messagesToDelete.push(rulePrompt);

                const ruleMessage = await interaction.channel.awaitMessages({ filter, max: 1, time: 60000 });

                if (!ruleMessage.size) {
                    return interaction.followUp('Time expired while collecting rules. Command cancelled.');
                }

                rules.push(ruleMessage.first().content);
                messagesToDelete.push(ruleMessage.first());
            }

            const embed = {
                color: 0x00ff00,
                title: title.content,
                description: rules.map((rule, index) => `**Rule ${index + 1}:** ${rule}`).join('\n'),
            };

            for (const msg of messagesToDelete) {
                await msg.delete();
            }

            await interaction.followUp({ embeds: [embed] });
        } catch (error) {
            console.error('Error executing the /rules command:', error);
            await interaction.followUp({ content: 'An error occurred while creating the rules.', ephemeral: true });
        }
    },
};
