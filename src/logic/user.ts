import { User } from "../database/entity/user"
import { getRepository, QueryFailedError } from "typeorm";
import { logger } from "../logger";

export enum UserConstraint {
    uniqueChannelID="unique_user_teamchannelid_constraint"
}
export class UserAlreadyExists extends Error {
    public readonly discordID: string
    constructor(discordID: string) {
        super(`User "${discordID}" already exists`)        
        Object.setPrototypeOf(this, new.target.prototype)
        this.discordID = discordID
    }
}

export class UserNotExist extends Error {
    public readonly discordID: string
    constructor(discordID: string) {
        super(`User "${discordID}" already exists`)
        Object.setPrototypeOf(this, new.target.prototype)
        this.discordID = discordID
    }
}

export class ChannelAlreadyInUse extends Error {
    public readonly channelID: string
    constructor(channelID: string) {
        super(`User "${channelID}" already exists`)        
        Object.setPrototypeOf(this, new.target.prototype);
        this.channelID = channelID
    }
}

export interface IRegistrationData {
    discordID: string
    teamChannelID: string
}

export async function registerUser(data: IRegistrationData): Promise<void> {
    const discordID: string = data.discordID
    const channelID: string = data.teamChannelID
    //we can't parse the duplicate primary key error in the insert()  
    //because we don't know what the primary key constraint is and
    //there seems to be no way to set it in TypeORM. :( 
    //todo: find a way to avoid the findOne() call 
    const dbUser = await getRepository(User).findOne(discordID)
    if(dbUser) throw new UserAlreadyExists(discordID)
    const user: User = new User()
    user.id = discordID
    user.teamChannelID = channelID
    user.currency = 100000000
    try {
        await getRepository(User).insert(user)
        logger.info(`Successfully registered user "${discordID}"`)
    } catch(err: any){
        if(err instanceof QueryFailedError) {
            const constraint = err.driverError.constraint
            if(constraint === UserConstraint.uniqueChannelID) throw new ChannelAlreadyInUse(channelID)
            logger.error("Channel is already in use?")
        }
        logger.error(`Can't register user "${discordID}": \n${JSON.stringify(err)}`)
        throw err
    }
}

export async function deleteUser(discordID: string): Promise<boolean> {
    const user = await getRepository(User).findOne(discordID) 
    if(!user) return false
    getRepository(User).remove(user)
    return true
}