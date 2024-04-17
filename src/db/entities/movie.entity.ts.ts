import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'movies' })
export class MovieEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ type: 'varchar' })
    title: string
}