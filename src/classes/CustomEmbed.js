module.exports = class CustomEmbed extends require("discord.js").MessageEmbed {
    constructor (data = {}) {
        super(data)
        this.setColor(require("../json/bot_config.json").accent)
    }
}