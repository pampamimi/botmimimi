const CustomEmbed = require("../../classes/CustomEmbed")
const wrongmessage = require("../../utils/wrongMessage")

module.exports = {
    name: "nuke",
    aliases: ["frei"],
    arguments: [{label: "amount"}],
    reqargs: 1,
    run: async (client, message, args) => {
        if (!parseInt(args[0])) return wrongmessage()
        const isFrei = message.content.toLowerCase().startsWith(client.config.prefix+"f")
        
        const amount = parseInt(args[0])

        const toDelete = new Array()

        await message.channel.messages.fetch({ limit: amount + 1 }).then(msgs => msgs.map((_ignore, inex) => { toDelete.push(inex) }))

        toDelete.shift()
        let freiEmbed
        if (isFrei) freiEmbed = new CustomEmbed().setImage(client.assets.frei)

        try {
            message.channel.bulkDelete(toDelete).then(msgs => {
                msgs.size ? msgs.size = 1 : ""
                message.channel.send({
                    content: `${isFrei ? "Frei'd" : "Nuked"} the ${msgs.size > 1 ? `last ${msgs.size} messages` : "last message"} ☢️`,
                    embeds: freiEmbed ? [freiEmbed] : [] 
                }).then(notice => setTimeout(() => {
                    notice.delete().catch(() => {})
                }, 5000))
            })
        } catch {
            message.channel.send({ content: `Failed while ${isFrei ? "Frei-ing" : "Nuking"} message(s)... did you do something wrong?`})
        }

    }
}