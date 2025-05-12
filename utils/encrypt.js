module.exports = (text) => {
    text = text.toString().split(/(?!$)/u)
    text.forEach((char, index) => text[index] = require("../base_key.json")[char])
    return text.join("")
}