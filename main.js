const Discord = require('discord.js');

const client = new Discord.Client();

var fs = require('fs');

const ping = require('minecraft-server-util');

var prefix = '!';     //The bot's prefix

var newPrefix = '';

const package = require('./package.json');
var currentVersion = package.version;

function getTime(){
    var time = new Date();
    var timeOutput = (
            ('0' + time.getHours()).slice(-2) + ':' +
            ('0' + time.getMinutes()).slice(-2) + ':' +
            ('0' + time.getSeconds()).slice(-2)
        );
    return timeOutput;
}

var greeting = true;

const goofnite = ['goofnite', 'goofnite!', 'goofnitee', 'goofnitee!', 'goodnight', 'good night', 'gute nacht'];
const goodmorning = ['goodmorning', 'good morning', 'morning', 'mornin', 'goodmorning!', 'good morning!', 'morning!'];
const hi = ['hi', 'hey', 'hello', 'hallo', 'heya', 'hihi', 'hey hey', 'hi!', 'hey!', 'hello!', 'hallo!', 'heya!', 'hihi!', 'hey hey!'];
const welcomeBack = ['back', 'bacc', 'bek', 'bak', 'becc'];
const resiName = ['740308816603775026'];

client.once('ready', () => {    //Startup check
    console.log(
        '\n-----New ResiOS Session-----\n\n'+
        'Copyright (c) 2020 Lord Vertice\n\n\n'+
        'This project is licensed under the MIT License. Refer to the LICENSE.md file for more information.\n'+
        'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.\n\n'+
        'All Systems are now online!\n'+
        'Command and error log:\n'
    );
});

client.on('message', message => {   //Command handler
    let isOwner = message.author.id == '371365472966279178';
    let isStaff = message.member.roles.cache.some(role => role.name === 'Staff');

    function invalPerms(){
        message.channel.send('Error. You do not have the permission to use this command.');
        console.warn('User tried to use a command, but was not permitted to do so.');
    }

    function autoResTriggered(){
        console.log(`[${getTime()}] User "${message.author.tag}" on server "${message.guild.name}" in channel "${message.channel.name}" triggered an autoresponder.`);
    }
    if(greeting && !message.author.bot){
        if(message.content.startsWith("say hi") || message.content.startsWith("Say hi")){
            message.channel.send("Hi everyone~!");
            autoResTriggered();
        }
        if(goofnite.includes(message.content.toLowerCase())){
            message.channel.send(`Goofnite, ${message.author}!`);
            autoResTriggered();
        }
        if(goodmorning.includes(message.content.toLowerCase())){
            message.channel.send(`Good morning, ${message.author}!`);
            autoResTriggered();
        }
        if(hi.includes(message.content.toLowerCase())){
            message.channel.send(`Hello ${message.author}!`);
            autoResTriggered();
        }
        if(welcomeBack.includes(message.content.toLowerCase())){
            message.channel.send(`Welcome back, ${message.author}!`);
            autoResTriggered();
        }
        if(resiName.some(word => message.content.toLowerCase().includes(word)))message.channel.send('Hm?');
    }

    if(message.content.startsWith('Resistance Bot reset, auth code: Alpha X 333') && isOwner) message.channel.send('Emergency shutdown initiated... Calling method client.destroy()...').then(message.delete()).then(console.warn('Emergency shutdown has been called by valid owner ID.')).then(m => {client.destroy();});

    if(!message.content.startsWith(prefix) || message.author.bot) return; //checks command validity

    const args = message.content.slice(prefix.length).split(/ +/); //makes arguments readable
    const command = args.shift().toLowerCase(); //makes command readable

    console.log(`[${getTime()}] User "${message.author.tag}" on server "${message.guild.name}" in channel "${message.channel.name}" used the following command: ${prefix}${command} ${args.join(" ")}`); //this is the command logger. to enable it, run the bot with "node . >>log.txt"

    //Commands go here
    switch(command){
        case 'ping': //ping command
            message.channel.send('Pong!');
            break;
        case 'main': //accepts main application
            if(!isStaff){invalPerms(); return;}
            if(args[0] != null){
                let member = message.mentions.members.first(); //defines the "member" variable
                if (!member) return message.channel.send('> Error: malformed userID') //not a valid mention error
                let role = (message.member.guild.roles.cache.find(role => role.name === 'Approved')); //defines the "role" variable
                member.roles.add(role); //adds "role" to "member"
                let chan = client.channels.cache.get('676071670884335617'); //selects channel to send confirmation to
                if(chan){ //sends message
                    chan.send("<@"+member.id+"> your application has been accepted, the link is in <#675077554838831105>.");
                }
            } else {
                    message.channel.send('> Error: missing userID'); //no args error
            }
            break;
        case 'army':
            //refer to the "main" command for syntax info
            if(!isStaff){invalPerms(); return;}
            if(args[0] != null){
                let member = message.mentions.members.first();
                if (!member) return message.channel.send('> Error: malformed userID')
                let role = (message.member.guild.roles.cache.find(role => role.name === 'Approved for enlistment'));
                member.roles.add(role);
                let chan = client.channels.cache.get('676071670884335617');
                if(chan){
                    chan.send("<@"+member.id+"> your enlistment application has also been accepted, the link is in <#678301599302549544>.");
                }
            } else {
                    message.channel.send('> Error: missing userID');
            }
            break;
        case 'greeting':
        case 'greetings':
        case 'greet':
            if(!isStaff){invalPerms(); return;}
            if(!greeting){ //toggle "say hi"
                message.channel.send('Greetings activated!');
            } else message.channel.send('Greetings deactivated.');
            greeting = !greeting;
            break;
        case 'prefix': //change prefix
            if(!isStaff){invalPerms(); return;}
            newPrefix = args.join(" ");
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
        case 'help':
            const helpMenuEmbed = new Discord.MessageEmbed()
                .setColor('#406DDC')
                .setTitle('List of all commands:')
                .setDescription('All commands start with my current prefix (default: "!")\n\u200B')
                .attachFiles(['assets/resistance_chan_pfp.png', 'assets/PR.png', 'assets/miku.jpg'])
                .setAuthor(`Resistance Bot (ResiOS v${currentVersion})`, 'attachment://PR.png')
                .setThumbnail('attachment://resistance_chan_pfp.png')
                .addFields(
                    { name: '"help"', value: 'Displays this fancy message!~', inline: true},
                    { name: '"main @user"', value: 'Gives a member the @Approved role and sends a confirmation message!', inline: true},
                    { name: '"army  @user"', value: 'Just like the "main" command, but for enlistment applications.', inline: true},
                    { name: '"prefix <x>"', value: 'Changes my prefix to <x>. Can be a single character, or a word! Leaving <x> empty or rebooting my script will reset the prefix.', inline: true},
                    { name: '"ping"', value: 'Pong!', inline: true},
                    { name: '"greet", "greeting" or "greetings"', value: 'Toggles my greeting function on or off.', inline: true},
                    { name: '"roll <x>" or "random <x>"', value: 'Enter at least 2 options in place of <x>, seperated by spaces. I will then randomly choose one of them!', inline :true},
                    { name: '"say <x>"', value: 'I will repeat the exact contents of your message, excluding the prefix and command!', inline: true},
                    { name: '"announce <x>"', value: 'Just like "say", but I will append the author of the message at the end. Useful for announcements!', inline: true},
                    { name: '"tts <x>"', value: 'I have a voice now!~', inline: true},
                    { name: '"watch"', value: 'Sets my "Watching..." status on Discord.', inline: true},
                    { name: '"license"', value: 'This project is licensed under the MIT License. Use this command to learn more.', inline: true},
                    { name: '"minecraft <IP>" or "mc <IP>"', value: 'Prints out some stats for the entered Minecraft server IP. Defaults to "ncp.hopto.org".', inline: true}
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
            if(!isStaff){invalPerms(); return;}
            const announceMessage = args.join(" ");
            message.delete().catch(O_o => {});
            message.channel.send(`${announceMessage} \n\nAnnouncement author: ${message.author}`).catch(O_o => {});
            break;
        case 'say':
            if(!isStaff){invalPerms(); return;}
            const sayMessage = args.join(" ");
            message.delete().catch(O_o => {});
            message.channel.send(`${sayMessage}`).catch(O_o => {});
            break;
        case 'tts':
            if(!isStaff){invalPerms(); return;}
            const ttsMessage = args.join(" ");
            message.delete().catch(O_o => {});
            message.channel.send(`${ttsMessage}`, {tts: true}).catch(O_o => {});
            break;
        case 'watch':
            if(!isStaff){invalPerms(); return;}
            if(args[0] != null){
                const activity = args.join(" ");
                if(isOwner){
                    client.user.setActivity(`${activity}`, {type: 'WATCHING'});
                    message.channel.send(`Set my status to "Watching ${activity}"!`);
                } else message.channel.send('> Error: missing permissions');
            } else{
                client.user.setActivity('');
                message.channel.send('Status cleared!');
            }
            break;
        case 'license':
            fs.readFile('LICENSE.md', function (err, data) {
                if (err) {
                   return console.error(err);
                }
                message.channel.send('```\n' + data.toString()+'```');
                message.channel.send('You can view my source code here: https://lordvertice.hopto.org/LordVertice/resistance-bot. \nContributions are welcome.');
            });
            break;
        case 'minecraft':
        case 'mc':
            var serverVersion;
            var serverIP = args[0];
            if(args[0] == null) serverIP = 'ncp.hopto.org';
            ping(serverIP, 25565, { protocolVersion: 498, pingTimeout: 1000 * 10, enableSRV: true }, (error, response) => {
                if(error) message.channel.send('Server query failed.') && console.warn('Server query failed.');
                if(response == null) return;
                if(response.version === '1.12.2'){
                    serverVersion = 'The server is currently on version "1.12.2"'
                } else if(response.version === 'Paper 1.16.2'){
                    serverVersion = 'The server is currently on version "Paper 1.16.2"'
                } else serverVersion = ('The server is running an unknown version. ("'+response.version+'")')
                message.channel.send(
                    `Server Address: ${response.host}\n`+
                    `Version: ${serverVersion}\n`+
                    `Players online: ${response.onlinePlayers}`
                );
            });
            break;
    }
});

const {token} = require('./token.json'); //get token from file
client.login(token); // login using token
