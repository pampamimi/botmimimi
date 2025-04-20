module.exports = {
    name: "ping",
    run: async (client, message, args) => {
        message.channel.send(`I have approximately \`${client.ws.ping}\` braincells.`)
    },
}