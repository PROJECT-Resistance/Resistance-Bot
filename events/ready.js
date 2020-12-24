module.exports = (client) => {
	console.log(
		'\nLoad Complete!\n\n\n'+
		'Welcome back! All systems are nominal.\n'+
		'Command and error log:\n'
	);
	client.api.applications(client.user.id).guilds(654392586861281292).commands.post({
    	data: {
    	    name: "help",
    	    description: "I'll show you what I can do~"
		}
	});
	client.api.applications(client.user.id).guilds(654392586861281292).commands.post({
        data: {
            name: "ping",
    	    description: "Pong! Use this to check if I'm alright."
		}
	});
	client.api.applications(client.user.id).guilds(654392586861281292).commands.post({
        data: {
            name: "set",
    	    description: "Change my variable configuration."
		}
	});
}
