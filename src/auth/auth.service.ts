import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthResponseDto } from './auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    private jwtExpirationTimeInSeconds: number
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
        this.jwtExpirationTimeInSeconds = +this.configService.get<number>('JWT_EXPIRATION_TIME')
    }

    async signIn(email: string, password: string): Promise<AuthResponseDto> {
        const foundUser = await this.usersService.findByEmail(email)

        if (!foundUser || !compareSync(password, foundUser.password)) {
            throw new UnauthorizedException()
        }

        const payload = {
            sub: foundUser.id,
            email: foundUser.email
        }

        const token = this.jwtService.sign(payload)

        return {
            token,
            expiresIn: this.jwtExpirationTimeInSeconds
        }
    }
}
