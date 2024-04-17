import { InjectRedis } from "@liaoliaots/nestjs-redis"
import { Injectable } from "@nestjs/common"
import Redis from 'ioredis'

@Injectable()
export class RedisCacheRepository {
    constructor(@InjectRedis() private readonly redis: Redis) {}

    async saveData<T>(data: T, key: string): Promise<void> {

        await this.redis.set(key, JSON.stringify(data), "EX", 180)
    }

    async getData<T>(key: string): Promise<T> {
        return JSON.parse(await this.redis.get(key)) as T;
    }
}