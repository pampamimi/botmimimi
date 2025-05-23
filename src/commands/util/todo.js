const CustomEmbed = require("../../classes/CustomEmbed")
const write = require("../../utils/write")
const read = require("../../utils/read")
const wrongmessage = require("../../utils/wrongMessage")
const stringLimiter = require("../../utils/stringLimiter")

module.exports = {
    name: "todo",
    aliases: ['td'],
    arguments: [
        { label: "action", options: ["read", ["add", "write"], ["remove", "delete"], ["removeall", "deleteall"]]},
        {label : "ID"}
    ],
    run: async (client, message, args) => {
        const dir = "src/db/todos.json"

        if(!require("../../db/todos.json")?.[message.author.id]) {
            let data = read(dir)
            data[message.author.id] = new Array()
            write(dir, data)
        }

        if(args?.[0] == "read" || !args[0]) {
            const data = read(dir)[message.author.id]
            let desc = new Array()
            if(!Boolean(data.length))
                return message.channel.send({ content: "You have an empty to do list... :cricket:"})
            data.forEach((todos, index) => desc.push(`**[${index + 1}]**\n\`${todos}\``))
            return message.channel.send({
                embeds: [
                    new CustomEmbed()
                    .setFooter({ text: "@" + message.author.username })
                    .setDescription(desc.join("\n\n"))
                ],
                content: "Here is your to do list; [X] is the ID of certain TO DOs!"
            })
        }

        if (["add", "write"].includes(args[0])) {
            const data = read(dir)
            data[message.author.id].push(args.slice(1).join(" "))
            write(dir, data)
            return message.channel.send({ content: `\`${stringLimiter(args.slice(1).join(" "), 1950)}\` has been added to your to do list!`})
        }

        if (["remove", "delete"].includes(args[0])) {
            let data = read(dir)
            if(!args[1] || !data[message.author.id]?.[parseInt(args[1]) - 1]) return message.channel.send({ content: "Please provide TO DO's id you wanted to remove."})
            data[message.author.id].splice(parseInt(args[1]) - 1, 1)
            write(dir, data)
            return message.channel.send({ content: `TO DO with an ID of \`${args[1]}\` has been removed from the list!`})
        }

        if (["removeall", "deleteall"].includes(args[0])) {
            let data = read(dir)
            if(!Boolean(data?.[message.author.id].length))
                return message.channel.send({ content: "But you have nothing in your list..."})
            data[message.author.id] = new Array()
            write(dir, data)
            return message.channel.send({ content: "The burden is lifted :dove:"})
        }

        wrongmessage()
    }
}