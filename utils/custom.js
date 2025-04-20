const { MessageEmbed } = require("discord.js")
const config = require("../json/bot_config.json")

class CustomEmbed extends MessageEmbed {
    constructor(data = {}){
        super(data)
        this.setColor(config.accent)
    }
}

module.exports = { CustomEmbed }