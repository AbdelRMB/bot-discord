const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('announce')
        .setDescription('Send an announcement to a specified channel')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel to send the announcement to')
                .setRequired(true)
                .addChannelTypes(0, 5))  
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The announcement message')
                .setRequired(true)
        ),
    async execute(interaction) {
        try {
            const channel = interaction.options.getChannel('channel');
            const message = interaction.options.getString('message');
            await channel.send(message);
        } catch (error) {
            await interaction.reply({ content: 'An error occurred while sending the announcement.', ephemeral: true });
        }
    }
};
