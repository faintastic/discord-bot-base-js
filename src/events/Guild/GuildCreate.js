const discord = require("discord.js");

module.exports = {
    name: discord.Events.GuildCreate,

    async execute(guild) {
        if (guild.id !== process.env.GUILD_ID && process.env.PUBLIC_COMMANDS.toLowerCase() === "false") {
            await guild.leave();
        }
    }
}