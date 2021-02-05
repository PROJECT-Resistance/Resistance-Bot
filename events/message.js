module.exports = (client, message) => {
    const Autoresponder = require('../modules/classes/Autoresponder.js');
    const responderArray = [ /* eslint-disable no-undef */
        goofnite = new Autoresponder('goofnite', ['goofnite', 'goofnite!', 'goofnitee', 'goofnitee!', 'goodnight', 'good night', 'gute nacht'], `Goofnite, ${message.author}!`),
        goodmorning = new Autoresponder('goodmorning', ['goodmorning', 'good morning', 'morning', 'mornin', 'goodmorning!', 'good morning!', 'morning!'], `Good morning, ${message.author}!`),
        hi = new Autoresponder('hi', ['hi', 'hey', 'hello', 'hallo', 'heya', 'hihi', 'hey hey', 'hi!', 'hey!', 'hello!', 'hallo!', 'heya!', 'hihi!', 'hey hey!'], `Hi ${message.author}!`),
        welcomeBack = new Autoresponder('welcomeBack', ['back', 'bacc', 'bek', 'bak', 'becc'], `Welcome back, ${message.author}!`),
        cya = new Autoresponder('cya', ['gtg'], `See you soon, ${message.author}!`)
    ]; /* eslint-enable no-undef */

    for (let i = 0; i < responderArray.length; i++) {
        if (responderArray[i].getTriggers().includes(message.content.toLowerCase())) {
            message.channel.send(responderArray[i].getResponse());
            client.autoResTriggered(responderArray[i].getName(), message);
        }
    }

    if (message.author.bot) return;

    if (message.content.trim().endsWith('?')) client.crickets(message);

    const settings = message.settings = client.getSettings(message.guild);

    if (settings.annoy === true) {
        message.channel.send(message.content);
        client.autoResTriggered('annoy', message);
    }

    if (message.content.indexOf(settings.prefix) !== 0) return;

    const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);

    if (!cmd) return;

    console.log(`[${client.getTime()}] ${message.author.tag} used command "${settings.prefix}${command}" on server "${message.guild.name}" in channel "${message.channel.name}".`);

    cmd.run(client, message, args);
};
