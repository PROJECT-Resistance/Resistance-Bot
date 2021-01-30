const Discord = require('discord.js');
const fs = require('fs');
const Enmap = require('enmap');

const client = new Discord.Client();
const config = require('./config.json');
client.config = config;
client.version = require('./package.json').version;
client.Discord = Discord;

console.log(
    `\n---- Welcome to ResiOS version ${client.version} ----\n\n` +
    'Copyright (c) 2020-2021 Lord Vertice\n' +
    'Art and assets by Mk_TheOnePixel.\n\n\n' +
    'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.\n' +
    'This project is licensed under the MIT License. Refer to the LICENSE file for more information.\n\n\n' +
    'Loading...\n\n' +
    'Initializing module loader...'
);

fs.readdir('./events/', (err, files) => {
    if (err) return console.error(err);
    console.log('Loading event files...');
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        const eventName = file.split('.')[0];
        console.log(`Attempting to load event "${eventName}"`);
        const event = require(`./events/${file}`);
        client.on(eventName, event.bind(null, client));
    });
    console.log('Done.');
});

client.commands = new Enmap();
client.settings = new Enmap({ name: 'settings' });

fs.readdir('./commands/', (err, files) => {
    if (err) return console.error(err);
    console.log('Loading command files...');
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        const commandName = file.split('.')[0];
        console.log(`Attempting to load command "${commandName}"`);
        const command = require(`./commands/${file}`);
        client.commands.set(commandName, command);
    });
    console.log('Done.');
});

fs.readdir('./modules/', (err, files) => {
    if (err) return console.error(err);
    console.log('Loading other module files...');
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        const moduleName = file.split('.')[0];
        console.log(`Attempting to load module "${moduleName}"`);
        require(`./modules/${file}`)(client);
    });
    console.log('Done.');
});

client.login(config.token);
