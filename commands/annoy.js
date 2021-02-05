exports.run = async (client, message, args) => {
    const settings = message.settings;
    let active = settings.annoy;
    if (!args[0]) {
        active = !active;
        if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});
        client.settings.set(message.guild.id, active, 'annoy');
        message.channel.send(`Annoy toggled to ${active}.`);
    } else if (/\b(on|off)\b/gi.test(args[0])) {
        active = (args[0] === 'on');
        if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});
        if (active === settings['annoy']) return message.channel.send(`Annoy is already ${args[0]}!`);
        client.settings.set(message.guild.id, active, 'annoy');
        message.channel.send(`Annoy set to ${active}.`);
    } else {
        message.channel.send('Use `annoy` without arguments to toggle or use `annoy [on, off]`.');
    }
};
