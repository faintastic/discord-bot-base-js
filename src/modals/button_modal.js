const discord = require("discord.js");
const Colors = require("../utils/Colors");

module.exports = {
    customId: "button_modal",
    cooldown: 0,

    async execute(interaction, client) {
        await interaction.reply({
            embeds: [ 
                new discord.EmbedBuilder()
                    .setTitle("Modal Button Response")
                    .setColor(Colors.Default)
                    .setDescription(`Answer One: ${interaction.fields.getTextInputValue("questionOne")}\nAnswer Two: ${interaction.fields.getTextInputValue("questionTwo")}`)
                    .setFooter({ text: `Requested by: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
            ],
            ephemeral: true
        })
    }
}