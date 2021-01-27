module.exports = (client) => {
    const defaultSettings = {
        prefix: '!'
    };

    client.getSettings = (guild) => {
        client.settings.ensure('default', defaultSettings);
        if (!guild) return client.settings.get('default');
        const guildConf = client.settings.get(guild.id) || {};
        return ({ ...client.settings.get('default'), ...guildConf });
    };

    client.awaitReply = async (msg, question, limit = 60000) => {
        const filter = m => m.author.id === msg.author.id;
        await msg.channel.send(question);
        try {
            const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ['time'] });
            return collected.first().content;
        } catch (e) {
            return false;
        }
    };

    client.getPreviousMsg = async (msg) => {
        return msg.channel.messages.fetch({ limit: 2 })
            .then(messageMappings => {
                const messages = Array.from(messageMappings.values());
                const previousMessage = messages[1];
                return previousMessage.content;
            })
            .catch(error => console.log(error))
        ;
    };

    client.getTime = () => {
        const time = new Date();
        const timeOutput = (
            ('0' + time.getHours()).slice(-2) + ':' +
            ('0' + time.getMinutes()).slice(-2) + ':' +
            ('0' + time.getSeconds()).slice(-2)
        );
        return timeOutput;
    };

    client.autoResTriggered = (name, message) => {
        console.log(`[${client.getTime()}] ${message.author.tag} triggered the "${name}" autoresponder on server "${message.guild.name}" in channel "${message.channel.name}".`);
    };
};
