const { Collection } = require("discord.js")
const CustomClient = require("./classes/CustomClient")
const sqlite = require("better-sqlite3")
const client = new CustomClient({ intents: 32767 })

client.commands = new Collection()
client.database = new sqlite("data.db")
client.config = require("./json/bot_config.json")
// may wanna separate these below
client.customEmojis  = require("./json/emojis.json")
client.assets = require("./json/assets.json")

module.exports = client

require("./init/schema")(client.database)
require("dotenv").config()
require("./handler")(client)

client.login(process.env.TOKEN)