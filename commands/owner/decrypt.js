const { decrypt } = require("../../utils/functions")

module.exports = {
    name: "decrypt",
    aliases: ["dcry"],
    arguments: ["string"],
    reqargs: 1,
    run: async (client, message, args) => {
       message.channel.send({ content: `\`\`\`${decrypt(args.join(""))}\`\`\`` })
    },
}
