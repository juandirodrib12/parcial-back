import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ApiToken {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { unique: true })
    token: string;

    @Column('boolean', { default: true })
    isActive: boolean;

    @Column('number', { default: 10 })
    requestsLeft: number;
}