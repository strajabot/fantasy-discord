import { Entity, Column, OneToOne, PrimaryGeneratedColumn, PrimaryColumn, Unique } from "typeorm"
import { ITeam, Team } from "./team"

export interface IUser {
    id: string
    teamChannelID: string
    currency: number
    team?: ITeam
}
@Entity()
@Unique("unique_user_teamchannelid_constraint", ["teamChannelID"])
export class User implements IUser {

    @PrimaryColumn({ nullable: false })
    id: string

    @Column({ nullable: false })
    teamChannelID: string

    @Column({ default: 0, nullable: false })
    currency: number

    @OneToOne(() => Team, team => team.owner, 
        { eager: true, cascade: true})
    team: ITeam

}