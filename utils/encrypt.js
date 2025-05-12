const basekey = require("../base_key.json")

module.exports = (text) => {
    text = text.toString().split(/(?!$)/u)
    text.forEach((char, index) => text[index] = basekey[char])
    return text.join("")
}