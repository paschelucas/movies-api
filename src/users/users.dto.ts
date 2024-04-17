import { IsEmail, IsNotEmpty, IsNumber } from "class-validator"

export class UsersDto {
    @IsNumber()
    id: number

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string
}

export class CreateUserResponse {
    @IsNumber()
    id: number

    @IsEmail()
    email: string
}