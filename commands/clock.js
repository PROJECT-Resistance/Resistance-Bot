exports.run = async (client, message, args) => {
    const gitHub = 'https://github.com/PROJECT-Resistance/Resistance-Bot';

    const d = new Date();
    const utc = client.getTime(convertTZ(d, 'Etc/UTC'));
    const berlin = client.getTime(convertTZ(d, 'Europe/Berlin'));
    const ct = client.getTime(convertTZ(d, 'America/Swift_Current'));
    const pt = client.getTime(convertTZ(d, 'America/Los_Angeles'));

    const output = new client.Discord.MessageEmbed()
        .setColor('#406ddc')
        .setTitle('Resi Timezone Module')
        .setURL(gitHub)
        .setAuthor(`Resistance Bot (ResiOS v${client.version})`, 'https://i.ibb.co/yY4XdJ1/The-Resistance-Emblem-Blue.png', gitHub)
        .setDescription('These are the current times in our most common TZs:')
        .setThumbnail('https://i.ibb.co/g7fzYDZ/resistance-chan-pfp.png')
        .addFields(
            { name: 'Berlin', value: berlin },
            { name: 'Central Time', value: ct },
            { name: 'Pacific Time', value: pt },
            { name: 'UTC', value: utc }
        )
        .setFooter('Copyright (c) 2020-2021 Lord Vertice. Art and assets by Mk_TheOnePixel.', 'https://i.ibb.co/L9DgKxv/thumb-107489-2.jpg')
    ;
    message.channel.send(output);
};

function convertTZ (date, tzString) {
    return new Date((typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', { timeZone: tzString }));
}
