const discord = require("discord.js");
const Colors = require("../../../utils/Colors");
require("dotenv").config();

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName('help')
        .setDescription('Displays all available commands'),

    async execute(interaction, client) {
        await interaction.deferReply({});

        let embedBuilder = new discord.EmbedBuilder()
            .setColor(Colors.Default)
            .setTitle("Available Commands")
            .setFooter({ text: `Requested by: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() });

        if (process.env.USE_SLASH_COMMANDS === "true") {
            const slashCommands = Array.from(client.commands.values());
            let slashDescription = "";
            slashCommands.forEach(command => {
                slashDescription += `[/${command.data.name}]: ${command.data.description || "No description provided"}\n`;
            });
            embedBuilder.setDescription(`**Slash Commands**\n\`\`\`ini\n${slashDescription}\`\`\``);
        }

        if (process.env.USE_PREFIXED_COMMANDS === "true") {
            const prefixedCommands = Array.from(client.prefixedCommands.values());
            let prefixedDescription = "";
            prefixedCommands.forEach(command => {
                let description = `[${process.env.PREFIX}${command.data.name}]`;
                if (command.data.aliases && command.data.aliases.length > 0) {
                    description += ` [Aliases]: ${command.data.aliases.join(", ")}`;
                }
                description += ` | ${command.data.description || "No description provided"}`;
                prefixedDescription += `${description}\n`;
            });
            embedBuilder.addFields({ name: `Prefixed Commands`, value: `\`\`\`ini\n${prefixedDescription}\`\`\`` });
        }

        await interaction.editReply({
            embeds: [embedBuilder]
        });
    },
};
