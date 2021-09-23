import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Team } from "./team"

export enum Position {
    ATTACK="attack",
    MIDFIELD="midfield",
    DEFENDER="defender",
    GOALKEEPER="goalkeeper"
}

export interface IPlayer {
    id: number
    name: string
    position: Position
    price: number
    goals: number
    assists: number
    matches: number
    points: number
}

@Entity()
@Unique("unique_player_name_constraint", ["name"])
export class Player implements IPlayer {
    
    @PrimaryGeneratedColumn("increment", {
        type: "int",
    })
    id: number 

    @Column({
        type: "varchar",
        nullable: false,
    })
    name: string

    @Column({
        type: "enum",
        enum: Position,
        nullable: false
    })
    position: Position

    @Column({
        type: "int",
        nullable: false
    })
    price: number

    @Column({
        type: "int",
        default: 0
    })
    goals: number
    
    @Column({
        type: "int",
        default: 0
    })
    assists: number

    @Column({
        type: "int",
        default: 0
    })
    matches: number
    
    @Column({
        type: "int",
        default: 0
    })
    points: number

    @ManyToMany(() => Team)
    teams: Team[]

}