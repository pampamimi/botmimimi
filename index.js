const { Client, Collection } = require("discord.js")

const client = new Client({ intents: 32767 })
module.exports = client

client.commands = new Collection()
client.slashCommands = new Collection()
client.config = require("./json/bot_config.json")

require('dotenv').config()
require("./handler")(client)

client.login(process.env.TOKEN)