import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from '../db/entities/movie.entity.ts';
import { DeleteResult, Repository } from 'typeorm';
import { MoviesDto } from './movies.dto';

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(MovieEntity)
        private readonly moviesRepository: Repository<MovieEntity>
    ) { }

    public async create(newMovie: MoviesDto): Promise<MoviesDto> {
        const foundMovie = await this.findByTitle(newMovie.title)

        if (foundMovie) {
            throw new ConflictException(`Movie ${foundMovie.title} already registered`)
        }

        const dbMovie = new MovieEntity()
        dbMovie.title = newMovie.title

        const { id, title } = await this.moviesRepository.save(dbMovie)

        return { id, title }
    }

    public async findByTitle(title: string): Promise<MoviesDto | null> {
        const foundMovie = await this.moviesRepository.findOne({
            where: {
                title
            }
        })

        if (!foundMovie) return null

        return {
            id: foundMovie.id,
            title: foundMovie.title
        }
    }

    public async findAll(): Promise<MoviesDto[]> {
        return await this.moviesRepository.find()
    }

    public async update(id: number, newTitle: string): Promise<MoviesDto | null> {
        const foundMovie = await this.moviesRepository.findOneBy({ id })
        if (!foundMovie) throw new NotFoundException(`Movie with ID ${id} not found`)

        await this.moviesRepository.update({ id }, { title: newTitle })

        return {
            id,
            title: newTitle
        }
    }

    public async delete(id: number): Promise<DeleteResult> {
        const foundMovie = this.moviesRepository.findOneBy({ id })
        if (!foundMovie) throw new NotFoundException(`Movie with ID ${id} not found`)

        return await this.moviesRepository.delete({ id })
    }
}
