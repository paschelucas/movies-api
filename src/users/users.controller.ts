import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserResponse, UsersDto } from './users.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('create')
    public async create(@Body() user: UsersDto): Promise<CreateUserResponse> {
        return await this.usersService.create(user)
    }
}
