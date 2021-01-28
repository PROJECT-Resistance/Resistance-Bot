module.exports = (client) => {
    client.crickets = async msg => {
        let responded = false;
        client.on('message', message => {
            if (message.channel === msg.channel) responded = true;
        });
        await client.sleep(10000);
        if (!responded) {
            msg.channel.send(':cricket:');
            client.autoResTriggered('cricket', msg);
        }
    };
};
