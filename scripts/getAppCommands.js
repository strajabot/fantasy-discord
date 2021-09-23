//lists the application "/" commands that are stored by Discord
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const { loadConfig, getConfig } = require("../dist/config")
const { logger } = require("../dist/logger")

logger.info("Get all application \"/\" commands")

loadConfig()
const config = getConfig()
const id = config.discord.id
const token = config.discord.token

const rest = new REST({ version: "9" }).setToken(token)
rest.get(Routes.applicationCommands(id), { body: commands })
	.then((commands) => {
		logger.info(`Application "/" commands: \n${JSON.stringify(commands)}`)
	})
	.catch(err => {logger.error(err)})
