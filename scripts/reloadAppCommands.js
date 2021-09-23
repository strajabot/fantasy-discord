//updates the application "/" commands that are stored by Discord
//warn: Application level commands are cached on for an hour by Discord so they update with an hour delay
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const { commandList } =  require("../dist/command")
const { loadConfig, getConfig } = require("../dist/config")
const { logger } = require("../dist/logger")

logger.info("Reloading all application \"/\" commands")

loadConfig()
const config = getConfig()
const id = config.discord.id
const token = config.discord.token
const commands = []
commandList.forEach(command => {
    commands.push(command.data().toJSON())
})

const rest = new REST({ version: "9" }).setToken(token)
logger.debug(`Commands object: \n${JSON.stringify(commands)}`)
rest.put(Routes.applicationCommands(id), { body: commands })
	.then(() => logger.info("Successfully reloaded application \"/\" commands."))
	.catch(err => {logger.error(err)})
