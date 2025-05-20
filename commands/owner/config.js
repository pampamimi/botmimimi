const read = require("../../utils/read")
const write = require("../../utils/write")
const wrongMessage = require("../../utils/wrongMessage")

module.exports = {
    name: "config",
    arguments: [
        {label: "action", options: ["set", "get"]},
        {label: "value"},
        {label: "set as? (for \"set\")"}
    ],
    run: async (client, message, args) => {
        const config = "json/bot_config.json"
        const rcfg = read(config)

        if (!args[0]) return message.channel.send({ content: `\`\`\`json\n${JSON.stringify(rcfg)}\`\`\``})

        args[0] = args[0].toLowerCase()
        console.log(args[1])

        if (args[1] && !rcfg[args[1].toLowerCase()]) return message.channel.send({ content: `There is no value such as \`${args[1]}\`!` })
        if (args[0] == "get") return message.channel.send({ content: `Current value for ${args[1].toLowerCase()} is \`${rcfg[args[1]]}\`` })
        if (args[0] == "set") {
            if (!args[1] || !args[2]) return wrongMessage()
            rcfg[args[1].toLowerCase()] = args[2]
            write(config, rcfg)
            message.channel.send({ content: `The value of ${args[1].toLowerCase()} has been changed to \`${args[2]}\`. I must be restarted for the changes to apply.`})
        }
        else return wrongMessage()
    }
}