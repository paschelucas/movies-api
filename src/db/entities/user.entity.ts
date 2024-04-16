import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user' })
export class UserEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ type: 'varchar' })
    email: string

    @Column({type: 'varchar', name: 'password_hash'})
    passwordHash: string
}