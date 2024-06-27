console.clear();

const discord = require("discord.js");
const fs = require("fs");
const path = require("path");
const Logger = require("./utils/Logger");
require("dotenv").config();

const client = new discord.Client({
    intents: [
        discord.GatewayIntentBits.DirectMessageReactions,
        discord.GatewayIntentBits.DirectMessageTyping,
        discord.GatewayIntentBits.DirectMessages,
        discord.GatewayIntentBits.GuildModeration,
        discord.GatewayIntentBits.GuildEmojisAndStickers,
        discord.GatewayIntentBits.GuildIntegrations,
        discord.GatewayIntentBits.GuildInvites,
        discord.GatewayIntentBits.GuildMembers,
        discord.GatewayIntentBits.GuildMessageReactions,
        discord.GatewayIntentBits.GuildMessageTyping,
        discord.GatewayIntentBits.GuildMessages,
        discord.GatewayIntentBits.GuildPresences,
        discord.GatewayIntentBits.GuildScheduledEvents,
        discord.GatewayIntentBits.GuildVoiceStates,
        discord.GatewayIntentBits.GuildWebhooks,
        discord.GatewayIntentBits.Guilds,
        discord.GatewayIntentBits.MessageContent
    ],
    partials: [
        discord.Partials.Channel,
        discord.Partials.GuildMember,
        discord.Partials.GuildScheduledEvent,
        discord.Partials.Reaction,
        discord.Partials.ThreadMember,
        discord.Partials.User
    ]
});

function loadEvents(dir, client) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const itemPath = path.join(dir, item);
        if (fs.lstatSync(itemPath).isDirectory()) {
            loadEvents(itemPath, client);
        } else if (item.endsWith('.js')) {
            const event = require(itemPath);
            client.on(event.name, (...args) => event.execute(...args, client));
            if (process.env.LOG_LOAD_EVENTS.toLowerCase() === "true") {
                Logger.Info("Loaded event: " + event.name);
            }
        }
    }
}
loadEvents(path.join(__dirname, "events"), client);
process.on("error", error => {
    console.error(error);
})

client.login(process.env.DISCORD_TOKEN).catch(error => {
    console.clear();
    if (error.code === "TokenInvalid") {
        Logger.Error(`Invalid discord token provided, please review your .env file.`);
    }
});
