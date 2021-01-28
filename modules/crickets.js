module.exports = (client) => {
    client.crickets = async (msg) => {
        let responded = false;
        client.on('message', () => {
            responded = true;
        });
        await client.sleep(5000);
        if (!responded) {
            msg.channel.send(':cricket:');
            client.autoResTriggered('cricket', msg);
        }
    };
};
