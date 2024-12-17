const { REST, Routes } = require('discord.js');
const fs = require('fs');
const config = require('./config.json');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(config.token);

(async () => {
    try {
        console.log('Déploiement des commandes slash...');

        await rest.put(
            Routes.applicationCommands(config.clientId), 
            { body: commands },
        );

        console.log('Les commandes slash ont été déployées avec succès.');
    } catch (error) {
        console.error(error);
    }
})();
