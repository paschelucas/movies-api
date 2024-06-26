import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ type: 'varchar' })
    email: string

    @Column({type: 'varchar', name: 'password_hash'})
    passwordHash: string
}