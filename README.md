
# Discord.js V14 Bot Base

**THIS IS A VERY SHITTY CODEBASE, I WOULD RECOMMEND USING THIS https://github.com/faintastic/discord-bot-base**

Here is a base source code that I created that uses discord.js V14.15.3 and javascript.

I found this [source code](https://github.com/tsoxas/base) that was written in typescript and liked how it functioned, and I only use typescript for websites so I decided to rewrite it :)

This bot allows for slash commands and prefixed commands.
You can enable or disable this functionality in `.env`

## Authors

- [@faintastic](https://www.github.com/faintastic) - Github



## Deployment

To run this project follow the steps provided below:
```bash
1. npm i
2. Edit .env and fill in your information
3. (OPTIONAL) Change colors in src/utils/colors
4. Run node .
```

## Customizable Settings

- **DISCORD_TOKEN**: Your discord bot token that can be generated at https://discord.dev
- **PREFIX**: Your prefix for your prefixed commands (,ping)
- **GUILD_ID**: Your development guild id (only used if PUBLIC_COMMANDS is false)
- **USE_SLASH_COMMANDS**: Enable or disable slash command functionality
- **USE_PREFIXED_COMMANDS**: Enable or disable prefixed command functionality
- **PUBLIC_COMMANDS**: Enable or disable public commands
- **LOG_LOAD_EVENTS**: Enable or disable if you want it to log to the console when an event is loaded
- **LOG_LOAD_COMMANDS**: Enable or disable if you want it to log to the console when an command is loaded
- **LOG_BUTTON_CLICK**: Enable or disable if you want it to log to the console when an button is clicked
- **LOG_SELECT_MENU_CLICK**: Enable or disable if you want it to log to the console when an select menu is clicked
- **LOG_MODAL_SUBMIT**: Enable or disable if you want it to log to the console when an modal is submitted
- **LOG_COMMANDS**: Enable or disable if you want it to log to the console when an command is ran
- **SLASH_COMMANDS_DIRECTORY**: Change the directory which your slash commands are loaded from
- **PREFIXED_COMMANDS_DIRECTORY**: Change the directory which your prefixed commands are loaded from
- **BUTTONS_DIRECTORY**: Change the directory which your buttons are loaded from
- **MODALS_DIRECTORY**: Change the directory which your modals are loaded from
- **SELECT_MENU_DIRECTORY**: Change the directory which your select menus are loaded from
- **PRESENCE_STATUS**: Change your bot status (Correct inputs: online, idle, dnd, invisible)
- **PRESENCE_ACTIVITY**: Change your bot presence type (Correct inputs: PLAYING, STREAMING, LISTENING, WATCHING, COMPETING)
- **PRESENCE_NAME**: Change your bot presence name
- **PRESENCE_URL**: Change your bot presence streaming url (Only needed if PRESENCE_ACTIVITY is STREAMING)
