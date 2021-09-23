import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, Guild, User as DUser } from "discord.js";
import { logger } from "../../logger";
import { BaseCommand } from "../baseCommand"

export class RegisterCommand extends BaseCommand {
    data(): SlashCommandBuilder {
        return new SlashCommandBuilder()
            .setName("register")
            .setDescription("Register to play in the Fantasy tournament")
    }
    
    async execute(interaction: CommandInteraction): Promise<void> {

    }


}