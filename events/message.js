module.exports = (client, message) => {
	const autoresponders = [
		goofnite = ['goofnite', 'goofnite!', 'goofnitee', 'goofnitee!', 'goodnight', 'good night', 'gute nacht'],
		goodmorning = ['goodmorning', 'good morning', 'morning', 'mornin', 'goodmorning!', 'good morning!', 'morning!'],
		hi = ['hi', 'hey', 'hello', 'hallo', 'heya', 'hihi', 'hey hey', 'hi!', 'hey!', 'hello!', 'hallo!', 'heya!', 'hihi!', 'hey hey!'],
		welcomeBack = ['back', 'bacc', 'bek', 'bak', 'becc']
	];

	const responds = {
		'1' : `Goofnite, ${message.author}!`,
		'2' : `Good morning, ${message.author}!`,
		'3' : `Hi ${message.author}!`,
		'4' : `Welcome back, ${message.author}!`
	};

	for(i = 0; i < autoresponders.length; i++){
		if(autoresponders[i].includes(message.content.toLowerCase())){
			message.channel.send(responds[i+1]);
			client.autoResTriggered(autoresponders[i][0], message);
		}
	}

	if(message.author.bot) return;

	const settings = message.settings = client.getSettings(message.guild);

	if(message.content.indexOf(settings.prefix) !== 0) return;

	const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	const cmd = client.commands.get(command);

	if(!cmd) return;

	console.log(`[${client.getTime()}] ${message.author.tag} used command "${settings.prefix}${command}" on server "${message.guild.name}" in channel "${message.channel.name}".`);

	cmd.run(client, message, args);
};
