const encrypt = require("../../utils/encrypt")

module.exports = {
    name: "encrypt",
    aliases: ["ecry"],
    arguments: [{label: "string"}],
    reqargs: 1,
    run: async (client, message, args) => message.channel.send({ content: `\`\`\`${encrypt(args.join(""))}\`\`\`` })
}
