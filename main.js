const Discord = require('discord.js');

const client = new Discord.Client();

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));    //Use seperate files for commands
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
};

const prefix = '!';     //The bot's prefix

client.once('ready', () => {    //Startup check
    console.log('All systems are now online!')
});

client.on('message', message => {   //Command handler
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    //Commands go here
    switch(command){
        case 'ping':
            client.commands.get('ping').execute(message, args);
            break;
        case 'main':
            client.commands.get('main').execute(message, args);
            break;
        case 'army':
            client.commands.get('army').execute(message, args);
            break;
    }
});

client.login('NzQwMzA4ODE2NjAzNzc1MDI2.XynIUA.eNE4fuqJJtJqCNEGtPO35Svfezs');
