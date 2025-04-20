const fs = require("fs")
const basekey = require("../base_key.json")

function write (filepath, data) {
    try {
        fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
        console.error("Error writing data:", err);
    }
}

function read (filepath) {
    try {
        return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
    } catch (err) {
        console.error("Error reading data:", err);
    }
}

function getKeyfromValue (obj, thekey) {
    let i = -1
     for (let x in obj) {
        i++
        if (obj[x] == thekey) return Object.keys(obj)[i]
     }
     return null
} 

function argsToText (cmdargument) {
    let retval = new Array()
    cmdargument.forEach((args) => retval.push(`\`<${args.label}>\``))
    return retval.join(" ")
}

function encrypt (text) {
    text = text.toString().split(/(?!$)/u)
    text.forEach((char, index) => {
        text[index] = basekey[char]
    })
    return text.join("")
}

function decrypt (text) {
    text = text.toString().match(/.{1,5}/gu)
    text.forEach((char, index) => {
        text[index] = getKeyfromValue(basekey, char)
    })
    return text.join("")
}

function wrongmessage (text) {
    const { client, message, command } = require("../events/message_create") //${command.arguments.map(x => `\`<${x}>\``)}
    message.channel.send({ content: (text || "Incorrect argument. Please use the command as follows:")  + `\n\`${client.config.prefix}${command.name}\` ${argsToText(command.arguments)}` })
}

function capitalizeFirstLetter (text) {
    return String(text).charAt(0).toUpperCase() + String(text).slice(1)
}

function stringLimiter (text, limit, additionalCharCutAt) {
    //text limit is 2000
    if (text.length > limit) text = text.slice(0, additionalCharCutAt || limit) + "..."
    return text
}

function argsToText (cmdargument) {
    let retval = new Array()
    cmdargument.forEach((args) => retval.push(`\`<${args.label}>\``))
    return retval.join(" ")
}

module.exports = {
    write,
    read,
    encrypt,
    decrypt,
    getKeyfromValue,
    argsToText,
    wrongmessage,
    capitalizeFirstLetter,
    stringLimiter,
    argsToText
}