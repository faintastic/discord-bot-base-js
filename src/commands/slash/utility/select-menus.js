const discord = require("discord.js");
const Colors = require("../../../utils/Colors");

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("select-menus")
        .setDescription("Displays all testing select menus"),
    
    async execute(interaction, client) {
        await interaction.deferReply({ })

        const row = new discord.ActionRowBuilder()
            .addComponents(
                new discord.StringSelectMenuBuilder()
                    .setCustomId("string_select")
                    .setPlaceholder("Select a string")
                    .addOptions(
                        new discord.StringSelectMenuOptionBuilder()
                            .setLabel("Option 1")
                            .setValue("option_1")
                            .setDescription("This is option 1"),
                        new discord.StringSelectMenuOptionBuilder()
                            .setLabel("Option 2")
                            .setValue("option_2")
                            .setDescription("This is option 2"),
                        new discord.StringSelectMenuOptionBuilder()
                            .setLabel("Option 3")
                            .setValue("option_3")
                            .setDescription("This is option 3")
                    )
            )
        
        const row2 = new discord.ActionRowBuilder()
            .addComponents(
                new discord.RoleSelectMenuBuilder()
                    .setCustomId("role_select")
                    .setPlaceholder("Select a role")
                    .setMinValues(1)
                    .setMaxValues(1),
            )
        
        const row3 = new discord.ActionRowBuilder()
            .addComponents(
                new discord.UserSelectMenuBuilder()
                    .setCustomId("user_select")
                    .setPlaceholder("Select a user")
                    .setMinValues(1)
                    .setMaxValues(1),
            )
        
        const row4 = new discord.ActionRowBuilder()
            .addComponents(
                new discord.ChannelSelectMenuBuilder()
                    .setCustomId("channel_select")
                    .setPlaceholder("Select a channel")
                    .setMinValues(1)
                    .setMaxValues(1),
            )
        
            await interaction.editReply({
                embeds: [
                    new discord.EmbedBuilder()
                        .setTitle("Testing Select Menus")
                        .setColor(Colors.Default)
                        .setDescription("Here are all of the testing select menus")
                        .setFooter({ text: `Requested by: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL()})
                ],
                components: [row, row2, row3, row4]
            })
    }
}