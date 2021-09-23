import { logger } from "./logger"

let config: Config

export class Config {
    readonly environment: string
    readonly logLevel: string
    readonly testGuild: string
    readonly discord: DiscordConfig
    readonly postgres: PostgresConfig     
    constructor(discord: DiscordConfig, postgres: PostgresConfig) {
        this.environment = process.env.NODE_ENV || "dev"
        this.logLevel = process.env.LOG_LEVEL || "info"
        this.testGuild = process.env.TEST_GUILD || ""
        if(this.environment == "dev" && this.testGuild == "") {
            logger.error("Environment variable \"TEST_GUILD\" is required because \"NODE_ENV\" is \"dev\"")
            process.exit()
        }
        this.discord = discord
        this.postgres = postgres
    }
}   

export class DiscordConfig {
    readonly id: string
    readonly token: string
    constructor(id: string, token: string) {
        this.id = id
        this.token = token
    }
}

export class PostgresConfig {
    readonly host: string
    readonly port: number 
    readonly username: string
    readonly password: string
    constructor(host: string, port: number, username: string, password: string) {
        this.host = host
        this.port = port
        this.username = username
        this.password = password
    }
}

function loadDiscord(): DiscordConfig {
    const id = process.env.DISCORD_ID
    const token = process.env.DISCORD_TOKEN
    if(!id) {
        logger.error("Environment variable \"DISCORD_ID\" is required for bot to start")
        process.exit()
    }  
    if(!token) {
        logger.error("Environment variable \"DISCORD_TOKEN\" is required for bot to start")
        process.exit()
    }
    return new DiscordConfig(id, token)
}

function loadPostgres(): PostgresConfig {
    let host = process.env.POSTGRES_HOST
    let port = process.env.POSTGRES_PORT
    let username = process.env.POSTGRES_USER
    let password = process.env.POSTGRES_PASSWORD
    if(!host) { 
        logger.warn("Optional environment variable \"POSTGRES_HOST\" isn't provided, using default value")
        host = "localhost"
    }
    if(!port) {
        logger.warn("Optional enivronment variable \"POSTGRES_PORT\" isn't provided, using default value")
        port = "3306"
    }
    if(!username) {
        logger.warn("Optional environment variable \"POSTGRES_USER\", isn't provided, using default value")
        username = "admin"
    }
    if(!password) {
        logger.warn("Optional enviroment variable \"POSTGRES_PASSWORD\" isn't provided, using default value")
        password = "admin"
    }
    return new PostgresConfig(host, parseInt(port), username, password)
}   

export function loadConfig(): void {
    const discord = loadDiscord()
    const postgres = loadPostgres()
    config = new Config(discord, postgres)
}

export function getConfig(): Config {
    return config
}