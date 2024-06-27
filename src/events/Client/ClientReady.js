const discord = require("discord.js");
const fs = require("fs");
const path = require("path");
const Logger = require("../../utils/Logger");

const { REST } = require("@discordjs/rest");
require("dotenv").config();

module.exports = {
    name: discord.Events.ClientReady,

    async execute(client) {        
        client.commands = new discord.Collection();
        client.prefixedCommands = new discord.Collection();
        client.buttons = new discord.Collection();
        client.modals = new discord.Collection();
        client.selectMenus = new discord.Collection();

        client.cooldowns = new discord.Collection();
        client.prefixedCooldowns = new discord.Collection();
        client.buttonCooldowns = new discord.Collection();
        client.modalCooldowns = new discord.Collection();
        client.selectCooldowns = new discord.Collection();
        const commands = [];

        function readSlashCommands(dir) {
            const files = fs.readdirSync(dir);

            for (const file of files) {
                const filePath = path.join(dir, file);
                const stat = fs.lstatSync(filePath);

                if (stat.isDirectory()) {
                    readSlashCommands(filePath);
                } else if (file.endsWith('.js')) {
                    const command = require(filePath);
                    try {
                        commands.push(command.data.toJSON());
                        client.commands.set(command.data.name, command);
                        if (process.env.LOG_LOAD_COMMANDS.toLowerCase() === "true") Logger.Info("Loaded command: /" + command.data.name);
                    } catch (error) { 
                        if (process.env.LOG_LOAD_COMMANDS.toLowerCase() === "true") Logger.Error(`There has been an error while loading command ${file}. Error: ${error}`);
                    }
                }
            }
        }
        function readPrefixedCommands(dir) {
            const files = fs.readdirSync(dir);

            for (const file of files) {
                const filePath = path.join(dir, file);
                const stat = fs.lstatSync(filePath);

                if (stat.isDirectory()) {
                    readPrefixedCommands(filePath);
                } else if (file.endsWith('.js')) {
                    const command = require(filePath);
                    try {
                        client.prefixedCommands.set(command.data.name, command);
                        if (process.env.LOG_LOAD_COMMANDS.toLowerCase() === "true") Logger.Info("Loaded command: " + process.env.PREFIX + command.data.name);
                    } catch (error) { 
                        if (process.env.LOG_LOAD_COMMANDS.toLowerCase() === "true") Logger.Error(`There has been an error while loading command ${file}. Error: ${error}`);
                    }
                }
            }
        }
        function readButtons(dir) {
            const files = fs.readdirSync(dir);

            for (const file of files) {
                const filePath = path.join(dir, file);
                const stat = fs.lstatSync(filePath);

                if (stat.isDirectory()) {
                    readButtons(filePath);
                } else if (file.endsWith('.js')) {
                    const button = require(filePath);
                    try {
                        client.buttons.set(button.customId, button);
                    } catch (error) {}
                }
            }
        }
        function readModals(dir) {
            const files = fs.readdirSync(dir);

            for (const file of files) {
                const filePath = path.join(dir, file);
                const stat = fs.lstatSync(filePath);

                if (stat.isDirectory()) {
                    readModals(filePath);
                } else if (file.endsWith('.js')) {
                    const modal = require(filePath);
                    try {
                        client.modals.set(modal.customId, modal);
                    } catch (error) {}
                }
            }
        }
        function readSelectMenus(dir) {
            const files = fs.readdirSync(dir);

            for (const file of files) {
                const filePath = path.join(dir, file);
                const stat = fs.lstatSync(filePath);

                if (stat.isDirectory()) {
                    readSelectMenus(filePath);
                } else if (file.endsWith('.js')) {
                    const selectMenu = require(filePath);
                    try {
                        client.selectMenus.set(selectMenu.customId, selectMenu);
                    } catch (error) {}
                }
            }
        }

        process.env.USE_SLASH_COMMANDS === "true" && readSlashCommands(path.join(__dirname, `../../${process.env.SLASH_COMMANDS_DIRECTORY || "commands/slash"}`))
        process.env.USE_PREFIXED_COMMANDS === "true" && readPrefixedCommands(path.join(__dirname, `../../${process.env.PREFIXED_COMMANDS_DIRECTORY || "commands/prefix"}`))
        readButtons(path.join(__dirname, `../../${process.env.BUTTONS_DIRECTORY || "buttons"}`));
        readModals(path.join(__dirname, `../../${process.env.MODALS_DIRECTORY || "modals"}`));
        readSelectMenus(path.join(__dirname, `../../${process.env.SELECT_MENU_DIRECTORY || "select-menus"}`));
        
        Logger.Info(`Logged in as ${client.user.tag} (${client.user.id})`);

        const activityTypes = {
            PLAYING: discord.ActivityType.Playing,
            STREAMING: discord.ActivityType.Streaming,
            LISTENING: discord.ActivityType.Listening,
            WATCHING: discord.ActivityType.Watching,
            COMPETING: discord.ActivityType.Competing,
        };

        try {
            const presence = client.user.setPresence({
                status: process.env.PRESENCE_STATUS || 'online',
                activities: [{
                    name: process.env.PRESENCE_NAME || 'with your feelings',
                    type: activityTypes[process.env.PRESENCE_ACTIVITY] || discord.ActivityType.Playing,
                    url: process.env.PRESENCE_URL || ''
                }]
            });
            Logger.Info(`Bot presence has been set | Status: ${presence.status} | Activity: ${presence.activities[0].name} | Type: ${presence.activities[0].type} ${process.env.PRESENCE_ACTIVITY === "STREAMING" ? `| URL: ${presence.activities[0].url}` : ""}`);
        } catch (error) {
            Logger.Error(`There has been an error while setting bot presence. Error: ${error}`);
        }

        const rest = new REST().setToken(process.env.DISCORD_TOKEN);
        try {
            if (process.env.PUBLIC_COMMANDS === 'true') {
                await rest.put(discord.Routes.applicationCommands(client.user.id), { body: commands });
                Logger.Info("Commands have been set globally");
            } else {
                await rest.put(discord.Routes.applicationGuildCommands(client.user.id, process.env.GUILD_ID), { body: commands });

                const guild = await client.guilds.fetch(process.env.GUILD_ID);
                Logger.Info(`Commands have been set for guild ${guild.name}`);
            }
        } catch (error) {
            Logger.Error(`There has been an error while setting application commands. Error: ${error}`);
        }
    }
}