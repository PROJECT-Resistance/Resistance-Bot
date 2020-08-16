const Discord = require('discord.js');

const client = new Discord.Client();

const fs = require('fs');

var prefix = '!';     //The bot's prefix

var newPrefix = '';

var greeting = true;

client.once('ready', () => {    //Startup check
    console.log('All systems are now online!')
});

client.on('message', message => {   //Command handler
    if(greeting){ // says hi!
        if(message.content.startsWith("say hi") || message.content.startsWith("Say hi")) message.channel.send("Hi everyone~!");
    }
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    //Commands go here
    switch(command){
        case 'ping': //ping command
            message.channel.send('pong!');
            break;
        case 'main': //accepts main application
            if(args[0] != null){
                let member = message.mentions.members.first(); //defines the "member" variable
                if (!member) return message.reply('Pls mention a member') //not a valid mention error
                let role = (message.member.guild.roles.cache.find(role => role.name === 'Approved')); //defines the "role" variable
                member.roles.add(role); //adds "role" to "member"
                let chan = client.channels.cache.get('433623329811726337'); //selects channel to send confirmation to
                if(chan){ //sends message
                    chan.send("<@"+member.id+"> your application has been accepted, the link is in <#409532233272262667>.");
                }
            } else {
                    message.channel.send('> Error: missing userID'); //no args error
            }
            break;
        case 'army':
            //refer to the "main" command for syntax info
            if(args[0] != null){
                let member = message.mentions.members.first();
                if (!member) return message.reply('Pls mention a member')
                let role = (message.member.guild.roles.cache.find(role => role.name === 'Approved for enlistment'));
                member.roles.add(role);
                let chan = client.channels.cache.get('433623329811726337');
                if(chan){
                    chan.send("<@"+member.id+"> your enlistment application has also been accepted, the link is in <#409532335265153038>.");
                }
            } else {
                    message.channel.send('> Error: missing userID');
            }
            break;
        case 'greeting':
        case 'greetings':
        case 'greet':
            if(!greeting){ //toggle "say hi"
                message.channel.send('Greetings activated!');
            } else message.channel.send('Greetings deactivated.');
            greeting = !greeting;
            break;
        case 'prefix': //change prefix
            newPrefix = args[0];
            if(newPrefix){ //checks whether a prefix has been entered. if not, will reset to "!"
                if(newPrefix.length == 1){ //checks is length = 1, if true it will just apply the prefix
                    prefix = newPrefix;
                    message.channel.send('My prefix is now ('+prefix+')');
                } else if(newPrefix.length > 1){ //if the prefix length is >1, it will add a space to the prefix
                    prefix = (newPrefix+' ');
                    message.channel.send('My prefix is now ('+newPrefix+')');
                } else message.channel.send('Error');
            } else{
                prefix = '!';
                message.channel.send('Prefix reset to (!).');
            }
            break;
    }
});

client.login('NzQwMzA4ODE2NjAzNzc1MDI2.XynIUA.eNE4fuqJJtJqCNEGtPO35Svfezs'); // login token
