const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('announce')
        .setDescription('Send an announcement to a specified channel')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
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

            const announcementEmbed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle('📢 Announcement')
                .setDescription(message)
                .setFooter({ text: `Announcement sent by ${interaction.user.tag}` })
                .setTimestamp();

            await channel.send({ embeds: [announcementEmbed] });

            await interaction.reply({ content: `Announcement sent to ${channel}!`, ephemeral: true });
        } catch (error) {
            console.error('Error while sending announcement:', error);
            await interaction.reply({ content: 'An error occurred while sending the announcement.', ephemeral: true });
        }
    }
};
