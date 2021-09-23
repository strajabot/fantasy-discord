const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const { commandList } =  require("./dist/command")
const { loadConfig, getConfig } = require("./dist/config")
const { logger } = require("./dist/logger")

loadConfig()
const config = getConfig()
const id = config.discord.id
const token = config.discord.token
logger.debug(`Client ID: "${id}"`)
logger.debug(`Client Token: "${token}"`)
const commands = []
commandList.forEach(command => {
    commands.push(command.data().toJSON())
})

const rest = new REST({ version: "9" }).setToken(token)
logger.debug(`Commands object: \n${JSON.stringify(commands)}`)
logger.info("Started refreshing application (/) commands.")
rest.put(Routes.applicationGuildCommands(id, "662771896332320770"), { body: commands })
	.then(() => logger.info("Successfully reloaded application (/) commands."))
	.catch(err => {logger.error(err)})
