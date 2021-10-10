const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

        data: new SlashCommandBuilder()
            .setName('ping')
            .setDescription('responde com pong'),
        async execute(interaction){
            await interaction.reply('Pong!');
        },

};