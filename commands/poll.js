const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Create a poll with Yes/No options')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
            option.setName('question')
                .setDescription('The question for the poll')
                .setRequired(true)
        ),
    async execute(interaction) {
        try {
            const question = interaction.options.getString('question');

            const pollEmbed = {
                color: 0x00ff00,
                title: 'Poll',
                description: question,
                fields: [
                    { name: 'Yes', value: '👍', inline: true },
                    { name: 'No', value: '👎', inline: true },
                ],
            };

            const message = await interaction.reply({ embeds: [pollEmbed], fetchReply: true });
            await message.react('👍');
            await message.react('👎');
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'An error occurred while creating the poll.', ephemeral: true });
        }
    }
};
