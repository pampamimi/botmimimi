module.exports = (text) => {
    text = text.toString().match(/.{1,5}/gu)
    text.forEach((char, index) => text[index] = require("./getKeyFromValue")(require("../base_key.json"), char))
    return text.join("")
}