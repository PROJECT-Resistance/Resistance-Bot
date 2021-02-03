exports.run = async (client, message, args) => {
    const joinedValue = args.join(' ');
    if (joinedValue.length < 1) return message.channel.send('Please specify a new value');
    if (joinedValue === client.settings.prefix) return message.channel.send('This setting already has that value!');

    if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});

    client.settings.set(message.guild.id, joinedValue, 'prefix');

    message.channel.send(`Prefix successfully edited to ${joinedValue}`);
};
