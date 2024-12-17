const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config.json');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

client.commands = new Collection();

const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.join(__dirname, 'commands', file));
    client.commands.set(command.data.name, command);  
    console.log(`Commande chargée: ${command.data.name}`);
}

client.once('ready', () => {
    console.log(`Connecté en tant que ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) {
        console.error(`Commande non trouvée: ${interaction.commandName}`);
        return; 
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(`Erreur lors de l'exécution de la commande ${interaction.commandName}:`, error);
        await interaction.reply({ content: 'Une erreur est survenue lors de l\'exécution de cette commande.', ephemeral: true });
    }
});

client.login(config.token);
