const basekey = require("../base_key.json")
const getKeyfromValue = require("./getKeyFromValue")

module.exports = (text) => {
    text = text.toString().match(/.{1,5}/gu)
    text.forEach((char, index) => text[index] = getKeyfromValue(basekey, char))
    return text.join("")
}