const discord = require("discord.js");
const Colors = require("../../../utils/Colors");

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("buttons")
        .setDescription("Displays all testing buttons"),
    
    async execute(interaction, client) {
        await interaction.deferReply({ })

        const row = new discord.ActionRowBuilder()
            .addComponents(
                new discord.ButtonBuilder().setCustomId("button").setLabel("Button (button.js)").setStyle(discord.ButtonStyle.Primary),
                new discord.ButtonBuilder().setCustomId("modal_button").setLabel("Modal Button (modal_button.js)").setStyle(discord.ButtonStyle.Primary),
                new discord.ButtonBuilder().setCustomId("unknown_button").setLabel("Unknown Button").setStyle(discord.ButtonStyle.Primary)
            )
        const row2 = new discord.ActionRowBuilder()
            .addComponents(
                new discord.ButtonBuilder().setCustomId("multi_button-1").setLabel("Button 1 (multi_button.js)").setStyle(discord.ButtonStyle.Primary),
                new discord.ButtonBuilder().setCustomId("multi_button-2").setLabel("Button 2 (multi_button.js)").setStyle(discord.ButtonStyle.Primary),
                new discord.ButtonBuilder().setCustomId("multi_button-3").setLabel("Button 3 (multi_button.js)").setStyle(discord.ButtonStyle.Primary),
                new discord.ButtonBuilder().setCustomId("multi_button").setLabel("Button Default (multi_button.js)").setStyle(discord.ButtonStyle.Primary)
            )

        await interaction.editReply({
            embeds: [
                new discord.EmbedBuilder()
                    .setTitle("Testing Buttons")
                    .setColor(Colors.Default)
                    .setDescription("Here are all of the testing buttons")
                    .setFooter({ text: `Requested by: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL()})
            ],
            components: [row, row2]
        })
        
    }
}