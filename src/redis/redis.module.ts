import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { RedisCacheRepository } from "./redis.repository";
import { RedisModule } from "@liaoliaots/nestjs-redis";

@Module({
    imports: [
        ConfigModule.forRoot(),
        RedisModule.forRoot({
            config: {
                host: process.env.REDIS_HOST,
                port: Number(process.env.REDIS_PORT),
                password: process.env.REDIS_PASSWORD
            }
        })
    ],
    providers: [RedisCacheRepository],
    exports: [RedisCacheRepository]
})
export class CacheRedisModule {}
