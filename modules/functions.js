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
}
