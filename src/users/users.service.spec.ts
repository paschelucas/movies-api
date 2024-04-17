import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { UserEntity } from '../db/entities/user.entity'
import { Repository } from 'typeorm'
import { UsersService } from './users.service'
import { ConflictException } from '@nestjs/common'

describe('UsersService', () => {
  let service: UsersService
  let repository: Repository<UserEntity>

  const userEntity: UserEntity = {
    id: 1,
    email: 'test@example.com',
    passwordHash: 'hashedPassword',
  }

  beforeEach(async () => {
    jest.resetAllMocks()
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue({
              email: 'test@example.com',
              password: 'hashedPassword'
            }),
            save: jest.fn().mockResolvedValue({
              email: 'test@example.com',
              password: 'hashedPassword'
            }),
          },
        },
      ],
    }).compile()

    service = module.get<UsersService>(UsersService)
    repository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity))
    jest.spyOn(repository, 'save').mockImplementation(async user => {
      return { id: user.id ?? 2, email: user.email, passwordHash: 'hashedPassword' }
    })
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should successfully insert a user', async () => {
      const createUserDto = {
        id: 1,
        email: 'new@example.com',
        password: 'newPassword'
      }
      jest.spyOn(service, 'findByEmail').mockResolvedValueOnce(null)
      jest.spyOn(service, 'create').mockResolvedValueOnce({
        id: 1,
        email: 'new@example.com'
      })
      await expect(service.create(createUserDto)).resolves.toEqual({
        id: 1,
        email: 'new@example.com',
      })
    })

    it('should throw conflict exception when email already exists', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(userEntity)
      await expect(service.create({
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword'
      })).rejects.toThrow(ConflictException)
    })
  })

  describe('findByEmail', () => {
    it('should return a single user by email', async () => {
      jest.spyOn(service, 'findByEmail').mockResolvedValueOnce({
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword'
      })
      expect(await service.findByEmail('test@example.com')).toEqual({
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword'
      })
    })
  })
})
