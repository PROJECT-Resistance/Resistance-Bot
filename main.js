const Discord = require('discord.js');

const client = new Discord.Client();

var prefix = '!';     //The bot's prefix

var newPrefix = '';

var greeting = true;

const goofnite = ['goofnite', 'goofnite!', 'goofnitee', 'goofnitee!', 'goodnight', 'good night', 'gute nacht'];
const goodmorning = ['goodmorning', 'good morning', 'morning', 'mornin', 'goodmorning!', 'good morning!', 'morning!'];
const hi = ['hi', 'hey', 'hello', 'hallo', 'heya', 'hihi', 'hey hey', 'hi!', 'hey!', 'hello!', 'hallo!', 'heya!', 'hihi!', 'hey hey!'];
const welcomeBack = ['back', 'bacc', 'bek'];
const resiName = ['740308816603775026']

client.once('ready', () => {    //Startup check
    console.log('All systems are now online!')
});

client.on('message', message => {   //Command handler
    let isOwner = message.author.id == '371365472966279178';

    if(greeting){ // says hi!
        if(message.content.startsWith("say hi") || message.content.startsWith("Say hi")) message.channel.send("Hi everyone~!");
    }
    if(greeting && !message.author.bot){
        if(goofnite.includes(message.content.toLowerCase())) message.channel.send(`Goofnite, ${message.author}!`);
    }
    if(greeting && !message.author.bot){
        if(goodmorning.includes(message.content.toLowerCase())) message.channel.send(`Good morning, ${message.author}!`);
    }
    if(greeting && !message.author.bot){
        if(hi.includes(message.content.toLowerCase())) message.channel.send(`Hello ${message.author}!`);
    }
    if(greeting && !message.author.bot){
        if(welcomeBack.includes(message.content.toLowerCase())) message.channel.send(`Welcome back, ${message.author}!`);
    }
    if(greeting && !message.author.bot && resiName.some(word => message.content.toLowerCase().includes(word)))message.channel.send('Hm?');

    if(message.content.startsWith('Resistance Bot reset, auth code: Alpha X 333') && isOwner) message.channel.send('Emergency reset initiated... Shutting down...').then(message.delete()).then(m => {client.destroy();});

    if(!message.content.startsWith(prefix) || message.author.bot || !message.member.roles.cache.some(role => role.name === 'Staff')) return; //checks command validity

    const args = message.content.slice(prefix.length).split(/ +/); //makes arguments readable
    const command = args.shift().toLowerCase(); //makes command readable

    //Commands go here
    switch(command){
        case 'ping': //ping command
            message.channel.send('Pong!');
            break;
        case 'main': //accepts main application
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
            if(!greeting){ //toggle "say hi"
                message.channel.send('Greetings activated!');
            } else message.channel.send('Greetings deactivated.');
            greeting = !greeting;
            break;
        case 'prefix': //change prefix
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
                .setAuthor('Resistance Bot (ResiOS v1.1.1-9)', 'attachment://PR.png')
                .setThumbnail('attachment://resistance_chan_pfp.png')
                .addFields(
                { name: '"help"', value: 'Displays this fancy message!~' },
                    { name: '"main @user"', value: 'Gives a member the @Approved role and sends a confirmation message!' },
                    { name: '"army  @user"', value: 'Just like the "main" command, but for enlistment applications.' },
                    { name: '"prefix <x>"', value: 'Changes my prefix to <x>. Can be a single character, or a word! Leaving <x> empty or rebooting my script will reset the prefix.' },
                    { name: '"ping"', value: 'Pong!' },
                    { name: '"greet", "greeting" or "greetings"', value: 'Toggles my greeting function on or off.' },
                    { name: '"roll <x>" or "random <x>"', value: 'Enter at least 2 options in place of <x>, seperated by spaces. I will then randomly choose one of them!' },
                    { name: '"say <x>"', value: 'I will repeat the exact contents of your message, excluding the prefix and command!' },
                    { name: '"announce <x>"', value: 'Just like "say", but I will append the author of the message at the end. Useful for announcements!' },
                    { name: '"tts <x>"', value: 'I have a voice now!~' }
                )
                .setFooter('Created by Lord Vertice#4078', 'attachment://miku.jpg');

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
                if(isOwner){
                    client.user.setActivity(`${activity}`, {type: 'WATCHING'});
                    message.channel.send(`Set my status to "Watching ${activity}"!`);
                } else message.channel.send('> Error: missing permissions');
            } else{
                client.user.setActivity('');
                message.channel.send('Status cleared!')
            }
            break;
    }
});

const { token } = require('./token.json'); //get token from file
client.login(token); // login using token
