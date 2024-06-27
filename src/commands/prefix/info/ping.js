const discord = require("discord.js");
const Colors = require("../../../utils/Colors");

module.exports = {
    data: {
        name: "ping",
        description: "Retrieves the bot's latency",
        aliases: ["p"]
    },
    cooldown: 10,

    async execute(message, client, args) {
        const start = Date.now();

        const msg = await message.reply({ content: "Pinging..." });
        await msg.edit({
            content: "",
            embeds: [
                new discord.EmbedBuilder()
                    .setTitle("Bot's Latency")
                    .setDescription(`Pong!\n\n Latency is \`${Date.now() - start}ms\` \nWebsocket latency is \`${Math.round(client.ws.ping)}ms\``)
                    .setColor(Colors.Default)
                    .setFooter({ text: `Requested by: ${message.member.user.username}`, iconURL: message.member.displayAvatarURL()})
                ] 
        })
    }
}