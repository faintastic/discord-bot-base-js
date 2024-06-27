const discord = require("discord.js");

module.exports = {
    name: discord.Events.Error,

    async execute(error) {
        console.error(error)
    }
}