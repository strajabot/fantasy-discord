import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { BaseCommand } from "../baseCommand"

export class TestCommand extends BaseCommand {
    
    data(): SlashCommandBuilder {
        return new SlashCommandBuilder()
            .setName("test")
            .setDescription("Test the bot")
    }
    
    async execute(interaction: CommandInteraction): Promise<void> {
        interaction.reply("Bot is working")
    }
    
}