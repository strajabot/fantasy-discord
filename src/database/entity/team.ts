import { IUser, User } from "./user"
import { IPlayer, Player } from "./player"
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryColumn } from "typeorm"

export interface ITeam {
    owner: IUser
    attack: IPlayer[]
    midfield: IPlayer[]
    defense: IPlayer[]
    goalkeeper: IPlayer
    bench: IPlayer[]
}

@Entity()
export class Team implements ITeam {
    
    @PrimaryColumn({})
    ownerID: number

    @JoinColumn({ name: "ownerdID" })
    @OneToOne(() => User, user => user.team)
    owner: IUser

    @Column({ default: 0 })
    points: number

    @ManyToMany(() => Player,
        { eager: true, cascade: false, nullable:false })
    attack: IPlayer[]

    @ManyToMany(() => Player,
        { eager: true, cascade: false, nullable:false })
    midfield: IPlayer[]
    
    @ManyToMany(() => Player,
        { eager: true, cascade: false, nullable:false })
    defense: IPlayer[]

    @ManyToMany(() => Player, 
        { eager: true, cascade: false, nullable:false })
    goalkeeper: IPlayer
    
    @ManyToMany(() => Player, 
        { eager: true, cascade: false, nullable: false })
    bench: IPlayer[]

}