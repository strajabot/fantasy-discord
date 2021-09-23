import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

export abstract class BaseCommand {
    public abstract data(): SlashCommandBuilder
    public abstract execute(interaction: CommandInteraction): Promise<void>

}