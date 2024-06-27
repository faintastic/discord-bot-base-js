const discord = require("discord.js");

module.exports = {
    customId: "modal_button",
    cooldown: 0,

    async execute(interaction, client) {
        let modal = new discord.ModalBuilder()
            .setCustomId(`button_modal`)
            .setTitle("Example Modal")

        const questionOneInput = new discord.TextInputBuilder()
            .setCustomId('questionOne')
            .setMaxLength(400)
            .setLabel("This is a short question")
            .setStyle(discord.TextInputStyle.Short);

        const questionTwoInput = new discord.TextInputBuilder()
            .setCustomId('questionTwo')
            .setMaxLength(400)
            .setLabel("This is a long question")
            .setStyle(discord.TextInputStyle.Paragraph);

        const firstActionRow = new discord.ActionRowBuilder()
            .addComponents([questionOneInput]);
            
        const secondActionRow = new discord.ActionRowBuilder()
            .addComponents([questionTwoInput]);

        modal.addComponents([firstActionRow, secondActionRow]);
        await interaction.showModal(modal)
    }
}