exports.run = async (client, message, args) => {
    const gitHub = 'https://github.com/PROJECT-Resistance/Resistance-Bot';

    const d = new Date();
    const utc = convertTZ(d, 'Etc/UTC');
    const berlin = convertTZ(d, 'Europe/Berlin');
    const ct = convertTZ(d, 'America/Swift_Current');
    const pt = convertTZ(d, 'America/Los_Angeles');

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
    const localeString = date.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: tzString });
    const arr = localeString.split(/, +/g);
    const out = `${arr[3]}, ${arr[0]}, ${swapDay(arr[1])} ${arr[2]}`;
    return out;
}
function nth (d) {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
    }
}
function swapDay (monthday) {
    let [month, day] = monthday.split(/ +/g);
    day = day + nth(day);
    const daymonth = day + ' ' + month;
    return daymonth;
}
