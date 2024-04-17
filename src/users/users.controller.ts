import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserResponse, UsersDto } from './users.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @HttpCode(HttpStatus.CREATED)
    @Post('create')
    public async create(@Body() user: UsersDto): Promise<CreateUserResponse> {
        console.log(123)

        return await this.usersService.create(user)
    }
}
