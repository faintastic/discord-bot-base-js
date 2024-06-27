const discord = require("discord.js");
const Colors = require("../../../utils/Colors")

module.exports = {
    cooldown: 10,
    data: new discord.SlashCommandBuilder()
        .setName("ping")
        .setDescription("Retrieves the bot's latency"),
    
    async execute(interaction, client) {
        await interaction.deferReply({})
        const start = Date.now();

        await interaction.editReply({ content: "Pinging..." });
        await interaction.editReply({ 
            content: "",
            embeds: [
                new discord.EmbedBuilder()
                    .setTitle("Bot's Latency")
                    .setDescription(`Pong!\n\n Latency is \`${Date.now() - start}ms\` \nWebsocket latency is \`${Math.round(client.ws.ping)}ms\``)
                    .setColor(Colors.Default)
                    .setFooter({ text: `Requested by: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL()})
                ] 
            });
    }
}