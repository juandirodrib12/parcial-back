import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ApiToken {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    token: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: 10 })
    requestsLeft: number;
}