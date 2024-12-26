const { Client, GatewayIntentBits, Collection, REST, Routes, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config.json');

const commands = [];
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ]
});

const clientId = config.clientId;
const guildId = config.guildId;

client.commands = new Collection();

const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.join(__dirname, 'commands', file));
    client.commands.set(command.data.name, command);  
    commands.push(command.data.toJSON()); 
    console.log(`Command loaded: ${command.data.name}`);
}

const rest = new REST({ version: '10' }).setToken(config.token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId), 
            { body: commands }
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) {
        console.error(`Command not found: ${interaction.commandName}`);
        return; 
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(`Error executing the command ${interaction.commandName}:`, error);
        await interaction.reply({ content: 'An error occurred while executing this command.', ephemeral: true });
    }
});

client.on('guildMemberAdd', async member => {
    try {
        // Welcome message
        const welcomeChannel = member.guild.channels.cache.get(config.welcomeChannelId);
        if (welcomeChannel) {
            const welcomeEmbed = new EmbedBuilder()
                .setColor(0x00FF00)
                .setTitle('🎉 Bienvenue sur le serveur !')
                .setDescription(`Bienvenue ${member.user} ! Nous sommes ravis de t'avoir parmi nous. Pense à consulter les règles et amuse-toi bien !`)
                .setThumbnail(member.user.displayAvatarURL())
                .setFooter({ text: `Membre #${member.guild.memberCount}` })
                .setTimestamp();

            await welcomeChannel.send({ embeds: [welcomeEmbed] });
        }

        // Logs message
        const logChannel = member.guild.channels.cache.get(config.logJoinLeaveChannelId);
        if (logChannel) {
            const logEmbed = new EmbedBuilder()
                .setColor(0x0000FF)
                .setTitle('📥 Nouveau membre !')
                .setDescription(`**Utilisateur :** ${member.user.tag} (${member.id})`)
                .setThumbnail(member.user.displayAvatarURL())
                .addFields(
                    { name: 'Créé le', value: `<t:${Math.floor(member.user.createdTimestamp / 1000)}:F>`, inline: true },
                    { name: 'Rejoint le', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>`, inline: true }
                )
                .setFooter({ text: `ID : ${member.id}` })
                .setTimestamp();

            await logChannel.send({ embeds: [logEmbed] });
        }
    } catch (error) {
        console.error('Error handling guildMemberAdd event:', error);
    }
});

client.on('guildMemberRemove', async member => {
    try {
        // Logs message
        const logChannel = member.guild.channels.cache.get(config.logJoinLeaveChannelId);
        if (logChannel) {
            const logEmbed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTitle('📤 Membre parti')
                .setDescription(`**Utilisateur :** ${member.user.tag} (${member.id}) a quitté le serveur.`)
                .setThumbnail(member.user.displayAvatarURL())
                .addFields(
                    { name: 'Créé le', value: `<t:${Math.floor(member.user.createdTimestamp / 1000)}:F>`, inline: true },
                    { name: 'Parti le', value: `<t:${Math.floor(Date.now() / 1000)}:F>`, inline: true }
                )
                .setFooter({ text: `ID : ${member.id}` })
                .setTimestamp();

            await logChannel.send({ embeds: [logEmbed] });
        }
    } catch (error) {
        console.error('Error handling guildMemberRemove event:', error);
    }
});

client.on('messageDelete', async message => {
    try {
        const logMessageChannel = message.guild.channels.cache.get(config.logMessageChannelId);
        if (!logMessageChannel) return;

        const logEmbed = new EmbedBuilder()
            .setColor(0xFFA500)
            .setTitle('🗑️ Message supprimé')
            .setDescription(`Un message a été supprimé dans <#${message.channel.id}>`)
            .addFields(
                { name: 'Auteur', value: `${message.author.tag} (${message.author.id})`, inline: true },
                { name: 'Contenu', value: message.content || '*(Message non disponible ou vide)*', inline: false },
                { name: 'Salon', value: `<#${message.channel.id}>`, inline: true }
            )
            .setFooter({ text: `ID Message : ${message.id}` })
            .setTimestamp();

        await logMessageChannel.send({ embeds: [logEmbed] });
    } catch (error) {
        console.error('Error logging deleted message:', error);
    }
});

client.login(config.token);
