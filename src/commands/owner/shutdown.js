module.exports = {
    name: "shutdown",
    run: async (client, message, args) => {
        await message.channel.send({ content: "Shutting down your pc, I hope you have saved all your work." })
        await new Promise(resolve => setTimeout(resolve, 1000));
        require('child_process').exec('shutdown /s /t 0');
    }
}