module.exports = {
    customId: "button",
    cooldown: 5,

    async execute(interaction, client) {
        await interaction.reply({ content: "Button has been clicked!", ephemeral: true });
    }
}