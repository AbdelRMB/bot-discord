const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Delete a certain number of messages')
        .addIntegerOption(option =>
            option.setName('number')
                .setDescription('The number of messages to delete')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(100)
        ),
    async execute(interaction) {
        try {
            const number = interaction.options.getInteger('number');
            const messages = await interaction.channel.messages.fetch({ limit: number });
            await interaction.channel.bulkDelete(messages);
            await interaction.reply({ content: `I have deleted ${number} messages.`, ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'An error occurred while deleting messages.', ephemeral: true });
        }
    }
};
