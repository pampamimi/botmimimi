const CustomEmbed = require("../../classes/CustomEmbed")

module.exports = {
    name: "steal",
    arguments: [{label: "UID"}],
    run: async (client, message, args) => {
        
        const target = args[0] ? args[0] : message.author.id

        require("axios").get(`https://discord.com/api/users/${target}`, {
            headers: {
                Authorization: `Bot ${client.token}`,
            }
        }).then(res => {
            
            const data = res.data
            const pict = `https://cdn.discordapp.com/avatars/${target}/${data.avatar}${data.avatar.startsWith("a_") ? ".gif" : ".png"}?size=2048`

            message.channel.send({
            embeds: [
                new CustomEmbed()
                .setFooter({ text: `@${data.username}${data.banner_color ? " • " + data.banner_color : ""}`})
                .setImage(pict)
            ],
            content: `[Source URL](${pict})`
        })
        })
    }
}
