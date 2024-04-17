import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { MoviesService } from './movies.service'
import { MoviesDto } from './movies.dto'
import { ConflictException } from '@nestjs/common'
import { MovieEntity } from '../db/entities/movie.entity.ts'

describe('MoviesService', () => {
  let service: MoviesService
  let repository: Repository<MovieEntity>

  const movieArray: MoviesDto[] = [
    { id: 1, title: 'Movie One' },
    { id: 2, title: 'Movie Two' },
  ]

  const oneMovie: MoviesDto = { id: 1, title: 'Movie One' }

  beforeEach(async () => {
    jest.clearAllMocks()
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(MovieEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(movieArray),
            findOne: jest.fn().mockResolvedValue(oneMovie),
            findOneBy: jest.fn().mockResolvedValue(oneMovie),
            save: jest.fn().mockResolvedValue(oneMovie),
            update: jest.fn().mockResolvedValue({ affected: 1 }),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile()

    service = module.get<MoviesService>(MoviesService)
    repository = module.get<Repository<MovieEntity>>(getRepositoryToken(MovieEntity))

    jest.spyOn(repository, 'findOne').mockResolvedValue(null)
    jest.spyOn(repository, 'findOneBy').mockResolvedValue(null)
    jest.spyOn(repository, 'save').mockImplementation(movie => Promise.resolve({
      id: movie.id ?? 3,
      title: movie.title
    }))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should successfully insert a movie', async () => {
      const newMovie: MoviesDto = { id: 3, title: 'Movie Three' }
      const createdMovie = await service.create(newMovie)
      expect(createdMovie).toEqual(newMovie)
      expect(repository.save).toHaveBeenCalledWith({
        title: newMovie.title
      })
    })

    it('should throw conflict exception when movie already exists', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(oneMovie)
      await expect(service.create(oneMovie)).rejects.toThrow(ConflictException)
    })
  })

  describe('findAll', () => {
    it('should return an array of movies', async () => {
      expect(await service.findAll()).toEqual(movieArray)
    })
  })

  describe('findByTitle', () => {
    it('should return a single movie by title', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(oneMovie)
      expect(await service.findByTitle('Movie One')).toEqual(oneMovie)
    })

    it('should return null if movie is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null)
      expect(await service.findByTitle('Movie Three')).toBeNull()
    })
  })


})

