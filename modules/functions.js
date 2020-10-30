module.exports = (client) => {
    client.getTime = () => {
        var time = new Date();
        var timeOutput = (
                ('0' + time.getHours()).slice(-2) + ':' +
                ('0' + time.getMinutes()).slice(-2) + ':' +
                ('0' + time.getSeconds()).slice(-2)
            );
        return timeOutput;
    };
    client.autoResTriggered = (n, message) => {
        console.log(`[${client.getTime()}] ${message.author.tag} triggered the "${n}" autoresponder on server "${message.guild.name}" in channel "${message.channel.name}".`);
    };
}
