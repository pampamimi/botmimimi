const { Collection } = require("discord.js")
const CustomClient = require("./src/classes/CustomClient")
const sqlite = require("better-sqlite3")
const client = new CustomClient({ intents: 32767 })

client.commands = new Collection()
client.database = new sqlite("data.db")
client.config = require("./src/json/bot_config.json")
// may wanna separate these below
client.customEmojis  = require("./src/json/emojis.json")
client.assets = require("./src/json/assets.json")

module.exports = client

require("./src/init/schema")(client.database)
require("dotenv").config()
require("./src/handler")(client)

client.login(process.env.TOKEN)