const { CustomEmbed } = require("../../utils/custom")
const { capitalizeFirstLetter, argsToText } = require("../../utils/functions")

module.exports = {
    name: "help",
    aliases: ["args"],
    arguments: ["command"],
    run: async (client, message, args) => {
        
        if (args[0]) {
            const command = client.commands.get(args[0].toLowerCase()) || client.commands.find(c => c.aliases?.includes(args[0].toLowerCase()))
            if (!command) return message.channel.send({ content: "Invalid command name" })
            
            

            const cmdDetailsEmbed = new CustomEmbed()
            .setTitle(`${client.config.prefix}${command.name}`)
            .setDescription(`\`${client.config.prefix}${command.name}\` ${command?.arguments ? argsToText(command.arguments) : ""}`)

            let fields = new Object()
            .addFields()

            message.channel.send({ embeds: [cmdDetailsEmbed] })
            return
        }
        
        const allCmdEmbed = new CustomEmbed()
        .setThumbnail(client.user.displayAvatarURL())
        const cmdByDir = new Object()

        client.commands.forEach(cmd => {
            if (!cmdByDir[cmd.directory]) cmdByDir[cmd.directory] = new Array()
            cmdByDir[cmd.directory].push(cmd)
        })

        for (const dir in cmdByDir) {
            if (dir == "owner")
            if (!client.config.owner_ids.includes(message.author.id)) continue
            let field = new Object
            field.name = `[ ${client.config.cmdCatEmoji[dir]} ] ${capitalizeFirstLetter(dir)}`
            field.value = new Array()
            cmdByDir[dir].forEach(cmd => field.value.push(`\`${cmd.name}\``))
            field.value = field.value.join(", ")
            allCmdEmbed.addFields(field)
        }

        message.channel.send({ embeds: [allCmdEmbed], content: `To see detailed guide of a certain command you may use \`${client.config.prefix}help\` \`<command>\`` })
    
    },
}