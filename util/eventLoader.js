const reqEvent = (event) => require(`../events/${event}`)
module.exports = (client, commands) => {
    client.on('ready', () => reqEvent('ready')(client, commands));
};