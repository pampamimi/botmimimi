const { CustomEmbed } = require("../../utils/custom")
const { capitalizeFirstLetter } = require("../../utils/functions")

module.exports = {
    name: "help",
    aliases: ["args"],
    arguments: ["command"],
    run: async (client, message, args) => {
        
        if (args[0]) {
            const command = client.commands.get(args[0].toLowerCase()) || client.commands.find(c => c.aliases?.includes(args[0].toLowerCase()))
            if (!command) return message.channel.send({ content: "Invalid command name" })
            message.channel.send(`The usage of ${command.name} command is:\n\`${client.config.prefix}${command.name}\` ${command?.arguments ? command.arguments.map(x => `\`<${x}>\``) : ""}`)
            return
        }
        
        const allCmdEmbed = new CustomEmbed()
        const cmdByDir = new Object()

        client.commands.forEach(cmd => {
            if (!cmdByDir[cmd.directory]) cmdByDir[cmd.directory] = new Array()
            cmdByDir[cmd.directory].push(cmd)
        })

        for (const dir in cmdByDir) {
            let field = new Object
            field.name = capitalizeFirstLetter(dir)
            field.value = new Array()
            cmdByDir[dir].forEach(cmd => field.value.push(`\`${cmd.name}\``))
            field.value = field.value.join(" ")
            allCmdEmbed.addFields(field)
        }

        message.channel.send({ embeds: [allCmdEmbed] })

        //console.log(cmdByDir)

        //allCmdEmbed.addFields({ name: cmd.directory, value: cmd.name })
        
    },
}
