const decrypt= require("../../utils/decrypt")

module.exports = {
    name: "decrypt",
    aliases: ["dcry"],
    arguments: [{label: "string"}],
    reqargs: 1,
    run: async (client, message, args) => message.channel.send({ content: `\`\`\`${decrypt(args.join(""))}\`\`\`` })
}
