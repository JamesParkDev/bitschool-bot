module.exports = {
    execute: (message, args, client) => {
        message.channel.send("Help Me");
    },

    config: {
        name: "help"
    }
}