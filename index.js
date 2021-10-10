const fs = require('fs');
const {Client, Collection, Intents} = require('discord.js');
const {token} = require('./config.json');

const client = new Client({intents: [Intents.FLAGS.GUILDS]});

client.isCommand = new Collection();
const commandFiles = fs.readdirSync(`./commands`).filter(file => file.endsWith('.js'));

for(const file of commandFiles){

    const command = require(`.commands/${file}`);
    client.command.set(command.data.name,command);

}


client.once('ready', () => {
    console.log('Prontinho meu rei!');

});


client.on('interactionCreate', async interaction => {

        if(!interaction.isCommand()) return;

        const command = client.command.get(interaction.commandName);

        if(!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Algo de errado não está certo',ephemeral: true});
        }
    
});

client.login(token);    
