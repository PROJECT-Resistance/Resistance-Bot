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
//auto-responder triggers
const goofnite = ['goofnite', 'goofnite!', 'goofnitee', 'goofnitee!', 'goodnight', 'good night', 'gute nacht'];
const goodmorning = ['goodmorning', 'good morning', 'morning', 'mornin', 'goodmorning!', 'good morning!', 'morning!'];
const hi = ['hi', 'hey', 'hello', 'hallo', 'heya', 'hihi', 'hey hey', 'hi!', 'hey!', 'hello!', 'hallo!', 'heya!', 'hihi!', 'hey hey!'];
const welcomeBack = ['back', 'bacc', 'bek', 'bak', 'becc'];
const resiName = ['740308816603775026'];

client.once('ready', () => {    //console output for startup
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

    function invalPerms(){
        message.channel.send('Error. You do not have the permission to use this command.');
        console.log(`[${getTime()}] ${message.author.tag} was not allowed to use this command.`);
    }
    //log autoresponders
    function autoResTriggered(){
        console.log(`[${getTime()}] ${message.author.tag} triggered an autoresponder on server "${message.guild.name}" in channel "${message.channel.name}".`);
    }
    //autoresponders
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
    //fancy shutdown command
    if(message.content.startsWith('Resistance Bot reset, auth code: Alpha X 333') && isOwner) message.channel.send('Shutting down...').then(message.delete()).then(console.log('Shutdown has been triggered by valid owner ID.\n\n-----End of ResiOS Session-----')).then(m => {client.destroy();});

    if(!message.content.startsWith(prefix) || message.author.bot) return; //checks command validity

    let isStaff;
    try{isStaff = message.member.roles.cache.some(role => role.name === 'Staff');} catch{console.log(`[${getTime()}] there was an error while getting ${message.author.tag}'s roles.`)}
    //permission stuff

    const args = message.content.slice(prefix.length).split(/ +/); //makes arguments readable
    const command = args.shift().toLowerCase(); //makes command readable

    console.log(`[${getTime()}] ${message.author.tag} used command "${prefix}${command} ${args.join(" ")}" on server "${message.guild.name}" in channel "${message.channel.name}"`); //this is the command logger. check README for instructions

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
        case 'army': //refer to the "main" command for syntax info
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
            if(!greeting){ //toggle autoresponders
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
        case 'help': //help menu embed
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
					{ name: '"minecraft <IP>" or "mc <IP>"', value: 'Prints out some stats for the entered Minecraft server IP. Defaults to "ncp.hopto.org".', inline: true},
					{ name: '"play <YTLink>"', value: 'Plays the entered YouTube link in your voice channel.', inline: true},
					{ name: '"skip" and "stop"', value: 'Skips to the next song in queue or stops playback.', inline: true}
                )
                .setFooter('Copyright (c) 2020 Lord Vertice', 'attachment://miku.jpg');

            message.channel.send(helpMenuEmbed);
            break;
        case 'roll': //natural 20!
        case 'random':
            if(args.length > 1){
                let random = Math.floor(Math.random() * args.length);
                message.channel.send('The result is: '+args[random]);
            } else message.reply('Please enter 2 or more options I can randomly choose from.')
            break;
        case 'announce': //!say but bad
            if(!isStaff){invalPerms(); return;}
            const announceMessage = args.join(" ");
            message.delete().catch(O_o => {});
            message.channel.send(`${announceMessage} \n\nAnnouncement author: ${message.author}`).catch(O_o => {});
            break;
        case 'say': //!say
            if(!isStaff){invalPerms(); return;}
            const sayMessage = args.join(" ");
            message.delete().catch(O_o => {});
            message.channel.send(`${sayMessage}`).catch(O_o => {});
            break;
        case 'tts': //say but with voice?
            if(!isStaff){invalPerms(); return;}
            const ttsMessage = args.join(" ");
            message.delete().catch(O_o => {});
            message.channel.send(`${ttsMessage}`, {tts: true}).catch(O_o => {});
            break;
        case 'watch': //watch stuff
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
        case 'license': //HEY! YOU GOT A LICENSE FOR THAT?
            fs.readFile('LICENSE.md', function (err, data) {
                if (err) {
                   return console.error(err);
                }
                message.channel.send('```\n' + data.toString()+'```');
                message.channel.send('You can view my source code here: https://lordvertice.hopto.org/LordVertice/resistance-bot. \nContributions are welcome.');
            });
            break;
        case 'minecraft': //server query
        case 'mc':
            var serverVersion;
            var serverIP = args[0];
            if(args[0] == null) serverIP = 'ncp.hopto.org';
            ping(serverIP, 25565, { protocolVersion: 498, pingTimeout: 1000 * 10, enableSRV: true }, (error, response) => {
                if(error) message.channel.send('Server query failed.') && console.log('Server query failed.');
                if(response == null) return;
                if(response.version === '1.12.2'){
                    serverVersion = 'The server is currently on version "1.12.2"'
                } else if(response.version === 'Paper 1.16.3'){
                    serverVersion = 'The server is currently on version "Paper 1.16.3"'
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

//music section
//let's gooo
const ytdl = require("ytdl-core");

const queue = new Map();

client.once("reconnecting", () => {
  	console.log("Reconnecting!");
});

client.once("disconnect", () => {
  	console.log("Disconnect!");
});

client.on("message", async message => {
  	if (message.author.bot) return;
  	if (!message.content.startsWith(prefix)) return;

  	const serverQueue = queue.get(message.guild.id);

  	if (message.content.startsWith(`${prefix}play`)) {
    	execute(message, serverQueue);
    	return;
  	} else if (message.content.startsWith(`${prefix}skip`)) {
    	skip(message, serverQueue);
    	return;
  	} else if (message.content.startsWith(`${prefix}stop`)) {
    	stop(message, serverQueue);
    	return;
  	}
});

async function execute(message, serverQueue) {
  	const args = message.content.split(" ");

  	const voiceChannel = message.member.voice.channel;
  	if (!voiceChannel){
    	return message.channel.send(
    	  	"You need to be in a voice channel to play music!"
    	)};
  	const permissions = voiceChannel.permissionsFor(message.client.user);
  	if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    	return message.channel.send(
      		"I need the permissions to join and speak in your voice channel!"
    	);
  	}

  	const validLink = ['https://www.youtube.com/watch?v=', 'https://youtu.be/']
  	if(args[1] == null){
		message.channel.send('You have to enter a valid YouTube link.');
		return;
  	}
  	if(!validLink.some(word => args[1].startsWith(word))){
		message.channel.send('You have to enter a valid YouTube link! Searching is not supported yet.');
		return;
  	}

  	const songInfo = await ytdl.getInfo(args[1]);
  	const song = {
    	title: songInfo.title,
    	url: songInfo.video_url
  	};

  	if (!serverQueue) {
    	const queueContruct = {
      	textChannel: message.channel,
      	voiceChannel: voiceChannel,
      	connection: null,
      	songs: [],
      	volume: 5,
      	playing: true
    	};

    	queue.set(message.guild.id, queueContruct);

    	queueContruct.songs.push(song);

    	try {
      		var connection = await voiceChannel.join();
      		queueContruct.connection = connection;
      		play(message.guild, queueContruct.songs[0]);
    	} catch (err) {
      		console.log(err);
      		queue.delete(message.guild.id);
      		return message.channel.send(err);
    	}
  	} else {
    	serverQueue.songs.push(song);
    	return message.channel.send(`${song.title} has been added to the queue!`);
  	}
}

function skip(message, serverQueue) {
  	if (!message.member.voice.channel)
    	return message.channel.send(
      	"You have to be in a voice channel to stop the music!"
    	);
  	if (!serverQueue)
    	return message.channel.send("There is no song that I could skip!");
  	serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
  	if (!message.member.voice.channel)
    	return message.channel.send(
      	"You have to be in a voice channel to stop the music!"
    	);
  	serverQueue.songs = [];
  	serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
  	const serverQueue = queue.get(guild.id);
  	if (!song) {
    	serverQueue.voiceChannel.leave();
    	queue.delete(guild.id);
    	return;
  }

  	const dispatcher = serverQueue.connection
    	.play(ytdl(song.url))
    	.on("finish", () => {
    		serverQueue.songs.shift();
    		play(guild, serverQueue.songs[0]);
    	})
    	.on("error", error => console.error(error));
  	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  	serverQueue.textChannel.send(`Start playing: **${song.title}**`);
}

const {token} = require('./token.json'); //get token from file
client.login(token); // login using token
