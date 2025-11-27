import { Character } from "src/character/entities/character.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Location {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

    @Column('text')
    type: string;

    @Column('number')
    cost: number;

    @OneToOne(() => Character, character => character.location)
    owner: Character;

    @ManyToMany(() => Character, character => character.favoriteLocations)
    favoriteCharacters: Character[];
}