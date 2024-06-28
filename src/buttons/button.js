module.exports = {
    customId: "button",
    cooldown: 5,

    async execute(interaction, client) {
        await interaction.reply({ content: "Button with cooldown has been clicked!", ephemeral: true });
    }
}
