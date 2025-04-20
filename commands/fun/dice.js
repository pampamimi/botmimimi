const { CustomEmbed } = require("../../utils/custom")
const { wrongmessage } = require("../../utils/functions")

module.exports = {
    name: "dice",
    arguments: [
        {
            label: "amount 1-3"
        }
    ],
    run: (client, message, args) => {

        if (parseInt(args[0])) args[0] = parseInt(args[0])

        let amount = 1

        if (args[0])
        if (args[0] > 3 || args[0] < 1) return wrongmessage("Amount of dice can only be 1-3!")
        else amount = args[0]
       
        const embed = new CustomEmbed() 
        let total = 0
        
        for (x = 1; x < 4; x++) {
            const roll = amount >= x ? Math.floor(Math.random() * 5 + 1) : 0
            embed.addFields({ inline: true, "name": amount >= x ? ":game_die:" : ":x:", "value": roll.toString() })
            total += roll
        }
    
        message.channel.send({ embeds: [embed], content: `You rolled a total of ${total}!` })
    }
}