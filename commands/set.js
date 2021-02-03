exports.run = async (client, message, [action, key, ...value]) => {
    const settings = message.settings;
    const defaults = client.settings.get('default');
    const overrides = client.settings.get(message.guild.id);
    if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});

    if (action === 'edit') {
        if (!key) return message.channel.send('Please specify a key to edit');
        if (!defaults[key]) return message.channel.send('This key does not exist in the settings');
        const joinedValue = value.join(' ');
        if (joinedValue.length < 1) return message.channel.send('Please specify a new value');
        if (joinedValue === settings[key]) return message.channel.send('This setting already has that value!');

        if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});

        client.settings.set(message.guild.id, joinedValue, key);

        message.channel.send(`${key.charAt(0).toUpperCase() + key.slice(1)} successfully edited to ${joinedValue}`);
    } else if (action === 'del' || action === 'reset') {
        if (!key) return message.channel.send('Please specify a key to reset.');
        if (!defaults[key]) return message.channel.send('This key does not exist in the settings');
        if (!overrides[key]) return message.channel.send('This key does not have an override and is already using defaults.');

        const response = await client.awaitReply(message, `Are you sure you want to reset ${key} to the default value?`);

        if (['y', 'yes'].includes(response.toLowerCase())) {
            client.settings.delete(message.guild.id, key);
            message.channel.send(`${key.charAt(0).toUpperCase() + key.slice(1)} was successfully reset to default.`);
        } else if (['n', 'no', 'cancel'].includes(response)) {
            message.channel.send(`Your setting for \`${key}\` remains at \`${settings[key]}\``);
        }
    } else if (action === 'get') {
        if (!key) return message.channel.send('Please specify a key to view');
        if (!defaults[key]) return message.channel.send('This key does not exist in the settings');
        const isDefault = !overrides[key] ? '\nThis is the default global default value.' : '';
        message.channel.send(`The value of ${key} is currently ${settings[key]}${isDefault}`);
    } else {
        const array = [];
        Object.entries(settings).forEach(([key, value]) => {
            array.push(`${key}${' '.repeat(20 - key.length)}::  ${value}`);
        });
        await message.channel.send(`= Current Guild Settings =\n${array.join('\n')}`, { code: 'asciidoc' });
    }
};
