module.exports = {
    name: "eval",
    aliases: ["e", "evaluate"],
    arguments: [{label: "code"}],
    reqargs: 1,
    run: async (client, message, args) => {
        const clean = text => {
            if (typeof (text) === "string") text = text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203))
            text = require("../../utils/stringLimiter")(text, 4000, 1988)
            return text
        }

        try {
            const code = args.join(" ")
            let evaled = eval(code)
            if (typeof evaled !== "string") evaled = require("util").inspect(evaled)
            if (code) message.reply({ content: `\`\`\`js\n${clean(evaled)}\`\`\`` })
            else message.reply({ content: "You haven't specified the code you want to run." })
        } catch (err) {
            message.reply({ content: `\`\`\`js\n${clean(err)}\`\`\`` })
        }
        
    }
}