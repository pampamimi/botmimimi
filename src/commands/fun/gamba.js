module.exports = {
    name: "gamba",
    arguments: [{label: "number(0-100)"}],
    reqargs: 1,
    run: async (client, message, args) => {
        if (isNaN(parseInt(args[0]))) return message.channel.send({ content: "use numbers dumbass" });
        const gambakey = Math.floor(Math.random() * 100)
        message.channel.send({ content: gambakey.toString() })
    }
}