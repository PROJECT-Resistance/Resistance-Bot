const Discord = require('discord.js');

const client = new Discord.Client();

var fs = require('fs');

const config = require("./config.json");

var prefix = config.prefix;     //The bot's prefix

var newPrefix = '';

client.once('ready', () => {    //Startup check
    console.log('All systems are now online!')
});

client.on('message', message => {   //Command handler

    if(!message.content.startsWith(prefix) || message.author.bot) return; //checks command validity

    const args = message.content.slice(prefix.length).split(/ +/); //makes arguments readable
    const command = args.shift().toLowerCase(); //makes command readable

    //Commands go here
    switch(command){
        case 'ping': //ping command
            message.channel.send('Pong!');
            break;
        case 'prefix': //change prefix
            newPrefix = args.join(" ");
            if(newPrefix){ //checks whether a prefix has been entered. if not, will reset to "!"
                if(newPrefix.length == 1){ //checks is length = 1, if true it will just apply the prefix
                    config.prefix = newPrefix;
                    prefix = newPrefix;
                    message.channel.send('My prefix is now ('+prefix+')');
                } else if(newPrefix.length > 1){ //if the prefix length is >1, it will add a space to the prefix
                    config.prefix = (newPrefix+' ');
                    prefix = (newPrefix+' ');
                    message.channel.send('My prefix is now ('+newPrefix+')');
                } else message.channel.send('Error');
            } else{
                config.prefix = '!';
                prefix = '!';
                message.channel.send('Prefix reset to (!).');
            }
            break;
        case 'help':
            const helpMenuEmbed = new Discord.MessageEmbed()
                .setColor('#406DDC')
                .setTitle('List of all commands:')
                .setDescription('All commands start with my current prefix (default: "!")\n\u200B')
                .attachFiles(['assets/resistance_chan_pfp.png', 'assets/PR.png', 'assets/miku.jpg'])
                .setAuthor('Resistance Bot (ResiOS Public Version v1.0.0-3)', 'attachment://PR.png')
                .setThumbnail('attachment://resistance_chan_pfp.png')
                .addFields(
                    { name: '"help"', value: 'Displays this fancy message!~' },
                    { name: '"prefix <x>"', value: 'Changes my prefix to <x>. Can be a single character, or a word! Leaving <x> empty will reset the prefix.' },
                    { name: '"ping"', value: 'Pong!' },
                    { name: '"roll <x>" or "random <x>"', value: 'Enter at least 2 options in place of <x>, seperated by spaces. I will then randomly choose one of them!' },
                    { name: '"say <x>"', value: 'I will repeat the exact contents of your message, excluding the prefix and command!' },
                    { name: '"announce <x>"', value: 'Just like "say", but I will append the author of the message at the end. Useful for announcements!' },
                    { name: '"tts <x>"', value: 'I have a voice now!~' },
                    { name: '"watch"', value: 'Sets my "Watching..." status on Discord.'},
                    { name: '"license"', value: 'This project is licensed under the MIT License. Use this command to learn more.'}
                )
                .setFooter('Copyright (c) 2020 Lord Vertice', 'attachment://miku.jpg');

            message.channel.send(helpMenuEmbed);
            break;
        case 'roll':
        case 'random':
            if(args.length > 1){
                let random = Math.floor(Math.random() * args.length);
                message.channel.send('The result is: '+args[random]);
            } else message.reply('Please enter 2 or more options I can randomly choose from.')
            break;
        case 'announce':
            const announceMessage = args.join(" ");
            message.delete().catch(O_o => {});
            message.channel.send(`${announceMessage} \n\nAnnouncement author: ${message.author}`).catch(O_o => {});
            break;
        case 'say':
            const sayMessage = args.join(" ");
            message.delete().catch(O_o => {});
            message.channel.send(`${sayMessage}`).catch(O_o => {});
            break;
        case 'tts':
            const ttsMessage = args.join(" ");
            message.delete().catch(O_o => {});
            message.channel.send(`${ttsMessage}`, {tts: true}).catch(O_o => {});
            break;
        case 'watch':
            if(args[0] != null){
                const activity = args.join(" ");
                client.user.setActivity(`${activity}`, {type: 'WATCHING'});
                message.channel.send(`Set my status to "Watching ${activity}"!`);
                config.status = activity;
            } else{
                client.user.setActivity('');
                message.channel.send('Status cleared!');
                config.status = '';
            }
            break;
        case 'license':
            fs.readFile('LICENSE.md', function (err, data) {
                if (err) {
                   return console.error(err);
                }
                message.channel.send("```\n" + data.toString()+'```');
             });
    }
});

const { token } = require('./token.json'); //get token from file
client.login(token); // login using token
