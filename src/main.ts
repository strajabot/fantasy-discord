import "reflect-metadata"
import { Client, Collection, Intents } from "discord.js"
import { createConnection } from "typeorm"
import { logger } from "./logger"
import { getConfig, loadConfig } from "./config"
import { commandList } from "./command/"
import { BaseCommand } from "./command/baseCommand"
import { cli } from "winston/lib/winston/config"
//inject commands into Client
declare module "discord.js" {
    interface Client {
        commands: Collection<string, BaseCommand>;
    }
}

loadConfig()
const config = getConfig()

createConnection()
    .then(() => {
        logger.info("Successfully connected to the database")
    })
    .catch(err => {
        logger.error(`Couldn't connect to Database: \n${err}`)
        process.exit()
    })

const intents: number[] = [
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
]

const client = new Client({ intents: intents })
client.commands = new Collection()
commandList.forEach(command => {
    client.commands.set(command.data().name, command)
})

client.on("ready", () => {
    logger.debug(`Client ID: ${client.user?.id}`)
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
        await command.execute(interaction);
    } catch (error) {
        if (error) console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.login(config.discord.token)
