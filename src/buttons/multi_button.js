module.exports = {
    customId: "multi_button",
    cooldown: 0,

    async execute(interaction, client) {
        // await interaction.reply({ content: `Button ${interaction.customId.split("-")[1]} has been clicked!`, ephemeral: true });

        switch (interaction.customId.split("-")[1]) {
            case "1":
                await interaction.reply({ content: `Different reply for button 1 | asdf` })
                break;
            case "2":
                await interaction.reply({ content: `Different reply for button 2 | asdff | ephemeral`, ephemeral: true })
                break;
            case "3":
                await interaction.reply({ content: `Different reply for button 3 | asdf` })
                break;
            default:
                await interaction.reply({ content: `Default reply for multi_button`, ephemeral: true })
        }
    }
}