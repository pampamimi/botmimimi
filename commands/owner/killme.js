module.exports = {
    name: "killme",
    aliases: ["killbot", "kys", "killyourself"],
    run: async (client, message, args) => {
        await message.channel.send({ content: "Goodbye." })
        await new Promise(resolve => setTimeout(resolve, 1000));
        process.exit()
    },
}
