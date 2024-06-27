module.exports = {
    customId: "channel_select",
    cooldown: 5,

    async execute(interaction, client, args) {
        await interaction.reply({ content: `You selected: <#${args[0]}>`, ephemeral: true });
    }
}