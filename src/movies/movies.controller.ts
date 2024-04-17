import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesDto } from './movies.dto';
import { AuthGuard } from '../auth/auth.guard';
import { DeleteResult } from 'typeorm';

@UseGuards(AuthGuard)
@Controller('movies')
export class MoviesController {
    constructor(
        private readonly moviesService: MoviesService
    ) { }

    @HttpCode(HttpStatus.CREATED)
    @Post('create')
    public async create(@Body() movie: MoviesDto): Promise<MoviesDto> {
        return await this.moviesService.create(movie)
    }

    @Get('all')
    public async findAll(): Promise<MoviesDto[]> {
        return await this.moviesService.findAll()
    }

    @Patch('update/:id')
    public async update(@Param('id', new ParseIntPipe()) id: number, @Body() body: { title: string }) {

        return await this.moviesService.update(id, body.title)
    }

    @Delete('delete/:id')
    public async delete(@Param('id', new ParseIntPipe()) id: number): Promise<DeleteResult> {
        return await this.moviesService.delete(id)
    }
}
