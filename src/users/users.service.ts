import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../db/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserResponse, UsersDto } from './users.dto';
import { hashSync as bcryptHashSync } from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>
    ) { }

    async create(newUser: UsersDto): Promise<CreateUserResponse> {
        const foundUser = await this.findByEmail(newUser.email)

        if (foundUser) {
            throw new ConflictException(`Email ${foundUser.email} already registered`)
        }

        const dbUser = new UserEntity()
        dbUser.email = newUser.email
        dbUser.passwordHash = bcryptHashSync(newUser.password, 10)
        const { id, email } = await this.usersRepository.save(dbUser)

        return { id, email }
    }

    async findByEmail(email: string): Promise<UsersDto | null> {
        const foundUser = await this.usersRepository.findOne({
            where: {
                email
            }
        })

        if (!foundUser) throw new NotFoundException(`User with email ${email} not found`)

        return {
            id: foundUser.id,
            email: foundUser.email,
            password: foundUser.passwordHash
        }
    }
}
