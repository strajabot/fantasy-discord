//updates the Test guild "/" commands (used for testing new commands)
//commands written to the guild scope are not cached and update instantly
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const { commandList } =  require("../dist/command")
const { loadConfig, getConfig } = require("../dist/config")
const { logger } = require("../dist/logger")

logger.info("Updating all of the \"/\" commands on the guild scope")

loadConfig()
const config = getConfig()
const id = config.discord.id
const token = config.discord.token
const guild = config.testGuild
const commands = []
commandList.forEach(command => {
    commands.push(command.data().toJSON())
})

const rest = new REST({ version: "9" }).setToken(token)
logger.debug(`Commands object: \n${JSON.stringify(commands)}`)
rest.put(Routes.applicationGuildCommands(id, guild), { body: commands })
	.then(() => logger.info("Successfully reloaded guild (/) commands."))
	.catch(err => {logger.error(err)})
