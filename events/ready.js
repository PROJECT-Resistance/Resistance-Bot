module.exports = (client) => {
	console.log(
		'\nLoad Complete!\n\n\n' +
		'Welcome back! All systems are nominal.\n' +
		'Command and error log:\n'
	);

	client.interactions
		.createCommand({
			name: "ping",
			description: "Pong! Use this to check if I can respond.",
		}, client.config.homeServer)
		.then(console.log)
		.catch(console.error);
}
