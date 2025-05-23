const CustomEmbed = require("../../classes/CustomEmbed")
const wrongmessage = require("../../utils/wrongMessage")

module.exports = {
    name: "extractimage",
    aliases: ["extract", "ei", "gettext"],
    arguments: [{label: "URL(can be an attachment instead)"}],
    run: async (client, message, args) => {

        let url
        
        if (args[0]) url = args[0]
        if (message.embeds[0]) url = message.embeds[0].url
        if (message.attachments.entries().next().value) url = message.attachments.entries().next().value?.[1].attachment
        if (!url) return wrongmessage("Couldn't find any image, but here's the command usage:")
        
        const fetched = await require("node-fetch")(url)
        const buffer = await fetched.buffer()
        const result = (await require("tesseract.js").recognize(buffer, "eng")).data

        message.channel.send({
            content: `I am ${result.confidence}% confident about this text extraction`,
            embeds: [new CustomEmbed().setDescription(result.text.slice(0, -2))]
        })
    }
}