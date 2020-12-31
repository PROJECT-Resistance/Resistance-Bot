module.exports = (client, interaction) => {
    const command = interaction.name;

	const cmd = client.commands.get(command);

	if(!cmd) return;

	console.log(`[${client.getTime()}] ${interaction.author.tag} used command "/${command}" on server "${interaction.guild.name}" in channel "${interaction.channel.name}".`);

	cmd.run(client, interaction, args);
}