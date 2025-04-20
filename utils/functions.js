const fs = require("fs")
const basekey = require("../base_key.json")

function getKeyfromValue (obj, thekey) {
    let i = -1
     for (let x in obj) {
        i++
        if (obj[x] == thekey) return Object.keys(obj)[i]
     }
     return null
} 

module.exports = {

    write: function (filepath, data) {
        try {
            fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf-8');
        } catch (err) {
            console.error("Error writing data:", err);
        }
    },

    read: function (filepath) {
        try {
            return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
        } catch (err) {
            console.error("Error reading data:", err);
        }
    },

    encrypt: function (text) {
        text = text.toString().split(/(?!$)/u)
        text.forEach((char, index) => {
            text[index] = basekey[char]
        })
        return text.join("")
    },

    decrypt: function (text) {
        text = text.toString().match(/.{1,5}/gu)
        text.forEach((char, index) => {
            text[index] = getKeyfromValue(basekey, char)
        })
        return text.join("")
    },

    getKeyfromValue,

    wrongmessage: function (text) {
        const { client, message, command } = require("../events/message_create")
        message.channel.send({ content: (text || "Incorrect argument. Please use the command as follows:")  + `\n\`${client.config.prefix}${command.name}\` ${command.arguments.map(x => `\`<${x}>\``)}` })
    },

    capitalizeFirstLetter: function (text) {
        return String(text).charAt(0).toUpperCase() + String(text).slice(1)
    },

    stringLimiter: function (text, limit, additionalCharCutAt) {
        //text limit is 2000
        if (text.length > limit) text = text.slice(0, additionalCharCutAt || limit) + "..."
        return text
    }

}