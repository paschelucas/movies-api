import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from '../db/entities/movie.entity.ts';
import { CacheRedisModule } from '../redis/redis.module';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity]), CacheRedisModule],
  providers: [MoviesService],
  controllers: [MoviesController]
})
export class MoviesModule {}
