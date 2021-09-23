import { getRepository } from "typeorm"
import { v4 as uuid } from "uuid"
import { IPlayer } from "../database/entity/player"
import { ITeam, Team } from "../database/entity/team"
import { User } from "../database/entity/user"
import { safeCompare } from "../util"
import { UserNotExist } from "./user"


export interface ITeamData {
    attack: IPlayer[]
    midfield: IPlayer[]
    defense: IPlayer[]
    goalkeeper: IPlayer
    bench: IPlayer[]
}

export async function createTeam(discordID: string, teamData: ITeamData ): Promise<void> {
    const user = await getRepository(User).findOne(discordID)
    if(!user) throw new UserNotExist(discordID)
    
    const team = new Team()
    team.attack = teamData.attack
    team.midfield = teamData.midfield
    team.defense = teamData.defense
    team.goalkeeper = teamData.goalkeeper
    team.bench = teamData.bench
    team.owner = user
    user.team = team
    
    getRepository(User).save(user)
}

export async function deleteTeam(identifier: string): Promise<boolean> {
    const team = await getRepository(Team).findOne(identifier)
    if(!team) return false
    await getRepository(Team).remove(team)
    return true
}