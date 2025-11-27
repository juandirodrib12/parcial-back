import { Location } from "src/location/entities/location.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Character {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

    @Column('number')
    salary: number;

    @Column('boolean')
    employee: boolean;

    @OneToOne(() => Location, location => location.owner, { cascade: true })
    @JoinColumn()
    location: Location;

    @ManyToMany(() => Location, location => location.favoriteCharacters, { cascade: true })
    @JoinTable()
    favoriteLocations: Location[];
}