import { IsNotEmpty, IsNumber } from "class-validator"

export class MoviesDto {
    @IsNumber()
    id: number

    @IsNotEmpty()
    title: string
}

