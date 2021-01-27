exports.run = async (client, message, args) => {
    if (!args[0]) {
        const previousMsg = await client.getPreviousMsg(message);
        const owo = await owoify(previousMsg);
        message.channel.send(owo);
        message.delete();
    } else {
        const msg = await message.channel.messages.fetch(args[0]);
        const owo = await owoify(msg.content);
        message.channel.send(owo);
        message.delete();
    }
};

const kaomoji = [
    '(*^ω^)',
    '(◕‿◕✿)',
    '(◕ᴥ◕)',
    'ʕ•ᴥ•ʔ',
    'ʕ￫ᴥ￩ʔ',
    '(*^.^*)',
    'owo',
    'OwO',
    '(｡♥‿♥｡)',
    'uwu',
    'UwU',
    '(*￣з￣)',
    '>w<',
    '^w^',
    '(つ✧ω✧)つ',
    '(/ =ω=)/'
];

const owoify = async str => {
    str = str.replace(/(?:l|r)/g, 'w');
    str = str.replace(/(?:L|R)/g, 'W');
    str = str.replace(/n([aeiou])/g, 'ny$1');
    str = str.replace(/N([aeiou])|N([AEIOU])/g, 'Ny$1');
    str = str.replace(/ove/g, 'uv');
    str = str.replace(/nd(?= |$)/g, 'ndo');
    str = str.replace(/!+/g, ` ${kaomoji[Math.floor(Math.random() * kaomoji.length)]}`);

    return str;
};
