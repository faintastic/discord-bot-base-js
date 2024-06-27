const discord = require("discord.js");
const Logger = require("../../utils/Logger");
const Colors = require("../../utils/Colors");

module.exports = {
    name: discord.Events.InteractionCreate,

    async execute(interaction, client) {
        const { cooldowns, buttonCooldowns, modalCooldowns, selectCooldowns, contextCooldowns } = client;

        if (interaction.isCommand()) {
            process.env.LOG_COMMANDS === "true" && Logger.Log(`Command /${interaction.commandName} was executed by ${interaction.user.tag} in guild ${interaction.guild.name}.`)
            const command = client.commands.get(interaction.commandName);
            if (!command) return;

            if (!cooldowns.has(command.data.name)) {
                cooldowns.set(command.data.name, new discord.Collection());
            }

            const now = Date.now();
            const timestamps = cooldowns.get(command.data.name);
            const cooldownAmount = (command.cooldown ?? 0) * 1000;

            if (timestamps.has(interaction.user.id)) {
                const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    const embed = new discord.EmbedBuilder()
                        .setTitle("Error - Command Cooldown")
                        .setDescription(`You are on cooldown from running this command for another ${timeLeft.toFixed(1)} seconds.`)
                        .setColor(Colors.Error);

                    if (!interaction.replied) {
                        if (interaction.deferred) {
                            return await interaction.editReply({ embeds: [embed], ephemeral: true });
                        } else {
                            return await interaction.reply({ embeds: [embed], ephemeral: true });
                        }
                    } else {
                        return await interaction.followUp({ embeds: [embed], ephemeral: true });
                    }
                }
            }

            timestamps.set(interaction.user.id, now);
            setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

            try {
                await command.execute(interaction, client);
            } catch (error) {
                Logger.Error(`Error executing command /${interaction.commandName}: ${error}`);
                const embed = new discord.EmbedBuilder()
                    .setTitle('Error - Command Execution')
                    .setDescription(`There has been an error running this command. \n\`\`\`${error}\`\`\``)
                    .setColor(Colors.Error);

                if (!interaction.replied) {
                    if (interaction.deferred) {
                        return await interaction.editReply({ embeds: [embed] });
                    } else {
                        return await interaction.reply({ embeds: [embed] });
                    }
                } else {
                    return await interaction.followUp({ embeds: [embed] });
                }
            }
        } else if (interaction.isButton()) {
            process.env.LOG_BUTTON_CLICK === "true" && Logger.Log(`Button "${interaction.customId}" was clicked by ${interaction.user.tag} in guild ${interaction.guild.name}.`)

            const buttonId = interaction.customId;
            const button = client.buttons.get(buttonId.split("-")[0]);
            if (!button) {
                const embed = new discord.EmbedBuilder()
                    .setTitle("Unknown Button")
                    .setDescription("This button is not recognized by this bot anymore.")
                    .setColor(Colors.Error);

                return await interaction.reply({ embeds: [embed], ephemeral: true });
            }

            if (!buttonCooldowns.has(buttonId)) {
                buttonCooldowns.set(buttonId, new discord.Collection());
            }

            const now = Date.now();
            const timestamps = buttonCooldowns.get(buttonId);
            const cooldownAmount = (button.cooldown ?? 0) * 1000;

            if (timestamps.has(interaction.user.id)) {
                const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    const embed = new discord.EmbedBuilder()
                        .setTitle("Error - Button Cooldown")
                        .setDescription(`You are on cooldown from clicking this button for another ${timeLeft.toFixed(1)} seconds.`)
                        .setColor(Colors.Error);

                    return await interaction.reply({ embeds: [embed], ephemeral: true });
                }
            }

            timestamps.set(interaction.user.id, now);
            setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

            try {
                await button.execute(interaction, client);
            } catch (error) {
                Logger.Error(`Error executing button command ${buttonId}: ${error}`);
                const embed = new discord.EmbedBuilder()
                    .setTitle('Error - Button Execution')
                    .setDescription(`There has been an error running this button command. \n\`\`\`${error}\`\`\``)
                    .setColor(Colors.Error);

                return await interaction.reply({ embeds: [embed], ephemeral: true });
            }
        } else if (interaction.isModalSubmit()) {
            process.env.LOG_MODAL_SUBMIT === "true" && Logger.Log(`Modal "${interaction.customId}" was submitted by ${interaction.user.tag} in guild ${interaction.guild.name}.`)

            const modalId = interaction.customId;
            const modal = client.modals.get(modalId.split("-")[0]);
            if (!modal) {
                const embed = new discord.EmbedBuilder()
                    .setTitle("Unknown Modal")
                    .setDescription("This modal is not recognized by this bot anymore.")
                    .setColor(Colors.Error);

                return await interaction.reply({ embeds: [embed], ephemeral: true });
            }

            if (!modalCooldowns.has(modalId)) {
                modalCooldowns.set(modalId, new discord.Collection());
            }

            const now = Date.now();
            const timestamps = modalCooldowns.get(modalId);
            const cooldownAmount = (modal.cooldown ?? 0) * 1000;

            if (timestamps.has(interaction.user.id)) {
                const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    const embed = new discord.EmbedBuilder()
                        .setTitle("Error - Modal Cooldown")
                        .setDescription(`You are on cooldown from submitting this modal for another ${timeLeft.toFixed(1)} seconds.`)
                        .setColor(Colors.Error);

                    return await interaction.reply({ embeds: [embed], ephemeral: true });
                }
            }

            timestamps.set(interaction.user.id, now);
            setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

            try {
                await modal.execute(interaction, client);
            } catch (error) {
                Logger.Error(`Error executing modal command ${modalId}: ${error}`);
                const embed = new discord.EmbedBuilder()
                    .setTitle('Error - Modal Execution')
                    .setDescription(`There has been an error running this modal. \n\`\`\`${error}\`\`\``)
                    .setColor(Colors.Error);

                return await interaction.reply({ embeds: [embed], ephemeral: true });
            }
        } else if (interaction.isAnySelectMenu()) {
            process.env.LOG_SELECT_MENU_CLICK === "true" && Logger.Log(`Select menu "${interaction.customId}" was clicked by ${interaction.user.tag} in guild ${interaction.guild.name}.`);

            const selectId = interaction.customId;
            const select = client.selectMenus.get(selectId.split("-")[0]);
            if (!select) {
                const embed = new discord.EmbedBuilder()
                    .setTitle("Unknown Select Menu")
                    .setDescription("This select menu is not recognized by this bot anymore.")
                    .setColor(Colors.Error);

                return await interaction.reply({ embeds: [embed], ephemeral: true });
            }

            if (!selectCooldowns.has(selectId)) {
                selectCooldowns.set(selectId, new discord.Collection());
            }

            const now = Date.now();
            const timestamps = selectCooldowns.get(selectId);
            const cooldownAmount = (select.cooldown ?? 0) * 1000;

            if (timestamps.has(interaction.user.id)) {
                const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    const embed = new discord.EmbedBuilder()
                        .setTitle("Error - Select Cooldown")
                        .setDescription(`You are on cooldown from clicking this select menu for another ${timeLeft.toFixed(1)} seconds.`)
                        .setColor(Colors.Error);

                    return await interaction.reply({ embeds: [embed], ephemeral: true });
                }
            }

            timestamps.set(interaction.user.id, now);
            setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

            try {
                await select.execute(interaction, client, interaction.values.toString().split("-"));
            } catch (error) {
                Logger.Error(`Error executing select ${selectId}: ${error}`);
                const embed = new discord.EmbedBuilder()
                    .setTitle('Error - Select Execution')
                    .setDescription(`There has been an error running this select. \n\`\`\`${error}\`\`\``)
                    .setColor(Colors.Error);

                return await interaction.reply({ embeds: [embed], ephemeral: true });
            }
        }
    }
};