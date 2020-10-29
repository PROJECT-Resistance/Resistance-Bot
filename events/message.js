module.exports = (client, message) => {
	if (message.author.bot) return;

	if (message.content.indexOf(client.config.prefix) !== 0) return;

	const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	const cmd = client.commands.get(command);

	if (!cmd) return;

	console.log(`[${client.getTime()}] ${message.author.tag} used command "${client.config.prefix}${command}" on server "${message.guild.name}" in channel "${message.channel.name}"`);

	cmd.run(client, message, args);
};
