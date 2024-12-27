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

    client.user.setPresence({
        activities: [
            {
                name: "Maintenance",
                type: 0,
                state: client.user.tag,
            }
        ],
        status: 'idle',
    });
});

client.on('interactionCreate', async interaction => {
    if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(`Error executing the command ${interaction.commandName}:`, error);
            await interaction.reply({ content: 'An error occurred while executing this command.', ephemeral: true });
        }
    } else if (interaction.isButton()) {
        try {
            const { guild, member } = interaction;

            if (interaction.customId === 'developer_role') {
                const role = guild.roles.cache.get(config.developerRoleId);
                if (!role) return interaction.reply({ content: "Le rôle Développeur n'existe pas.", ephemeral: true });

                if (member.roles.cache.has(role.id)) {
                    await member.roles.remove(role);
                    await interaction.reply({ content: 'Rôle Développeur retiré.', ephemeral: true });
                } else {
                    await member.roles.add(role);
                    await interaction.reply({ content: 'Rôle Développeur attribué.', ephemeral: true });
                }
            }

            if (interaction.customId === 'designer_role') {
                const role = guild.roles.cache.get(config.designerRoleId);
                if (!role) return interaction.reply({ content: "Le rôle Graphiste n'existe pas.", ephemeral: true });

                if (member.roles.cache.has(role.id)) {
                    await member.roles.remove(role);
                    await interaction.reply({ content: 'Rôle Graphiste retiré.', ephemeral: true });
                } else {
                    await member.roles.add(role);
                    await interaction.reply({ content: 'Rôle Graphiste attribué.', ephemeral: true });
                }
            }

            if (interaction.customId === 'verify_member') {
                const memberRole = interaction.guild.roles.cache.get(config.memberRoleId);
        
                if (!memberRole) {
                    return interaction.reply({ content: "Le rôle Membre n'existe pas ou est mal configuré.", ephemeral: true });
                }
        
                try {
                    await interaction.member.roles.add(memberRole);
                    await interaction.reply({ content: "Vous avez été vérifié et avez maintenant accès au serveur !", ephemeral: true });
                } catch (error) {
                    console.error('Erreur lors de l\'ajout du rôle Membre :', error);
                    await interaction.reply({ content: "Une erreur s'est produite lors de la vérification. Veuillez réessayer plus tard.", ephemeral: true });
                }
            }
        } catch (error) {
            console.error('Erreur lors de l\'interaction avec les boutons :', error);
            await interaction.reply({ content: "Une erreur s'est produite lors du traitement de votre demande.", ephemeral: true });
        }
    }
});

client.on('guildMemberAdd', async member => {
    try {
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
