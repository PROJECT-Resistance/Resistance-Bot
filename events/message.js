module.exports = (client, message) => {
	const goofnite = ['goofnite', 'goofnite!', 'goofnitee', 'goofnitee!', 'goodnight', 'good night', 'gute nacht'];
	const goodmorning = ['goodmorning', 'good morning', 'morning', 'mornin', 'goodmorning!', 'good morning!', 'morning!'];
	const hi = ['hi', 'hey', 'hello', 'hallo', 'heya', 'hihi', 'hey hey', 'hi!', 'hey!', 'hello!', 'hallo!', 'heya!', 'hihi!', 'hey hey!'];
	const welcomeBack = ['back', 'bacc', 'bek', 'bak', 'becc'];

	if (message.author.bot) return;

	if(goofnite.includes(message.content.toLowerCase())){
		message.channel.send(`Goofnite, ${message.author}!`);
		client.autoResTriggered('goofnite', message);
	}
	if(goodmorning.includes(message.content.toLowerCase())){
		message.channel.send(`Good morning, ${message.author}!`);
		client.autoResTriggered('goodmorning', message);
	}
	if(hi.includes(message.content.toLowerCase())){
		message.channel.send(`Hello ${message.author}!`);
		client.autoResTriggered('hi', message);
	}
	if(welcomeBack.includes(message.content.toLowerCase())){
		message.channel.send(`Welcome back, ${message.author}!`);
		client.autoResTriggered('welcomeBack', message);
	}

	if (message.content.indexOf(client.config.prefix) !== 0) return;

	const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	const cmd = client.commands.get(command);

	if (!cmd) return;

	console.log(`[${client.getTime()}] ${message.author.tag} used command "${client.config.prefix}${command}" on server "${message.guild.name}" in channel "${message.channel.name}"`);

	cmd.run(client, message, args);
};
