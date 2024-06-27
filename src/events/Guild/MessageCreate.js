const discord = require("discord.js");
const Colors = require("../../utils/Colors");
const Logger = require("../../utils/Logger");
require("dotenv").config();

module.exports = {
    name: discord.Events.MessageCreate,

    async execute(message, client) {
        if (message.author.bot) return;
        if (!message.guild) return;

        if (!message.content.startsWith(process.env.PREFIX)) return;
        const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();        
        const command = client.prefixedCommands.get(commandName) || client.prefixedCommands.find(cmd => cmd.data.aliases && cmd.data.aliases.includes(commandName));
        if (!command) return;

        if (!client.prefixedCooldowns.has(command.data.name)) {
            client.prefixedCooldowns.set(command.data.name, new discord.Collection());
        }

        process.env.LOG_COMMANDS === "true" && Logger.Log(`Command ${process.env.PREFIX}${commandName} was executed by ${message.member.user.username} in guild ${message.guild.name}.`)

        const now = Date.now();
        const timestamps = client.prefixedCooldowns.get(command.data.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                const embed = new discord.EmbedBuilder()
                    .setTitle("Error - Command Cooldown")
                    .setDescription(`You are on cooldown from running this command for another ${timeLeft.toFixed(1)} seconds.`)
                    .setColor(Colors.Error);
                return message.reply({ embeds: [embed] });
            }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        try {
            await command.execute(message, client, args);
        } catch (error) {
            console.error(error);
            message.reply('There was an error executing that command.');
        }
    }
};
