import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('PRD_DB_HOST'),
                port: +configService.get<number>('PRD_DB_PORT'),
                username: configService.get<string>('PRD_DB_USERNAME'),
                password: configService.get<string>('PRD_DB_PASSWORD'),
                database: configService.get<string>('PRD_DB_NAME'),
                url: configService.get<string>('PRD_DB_EXTERNAL_URL'),
                entities: [__dirname + '/entities/**'],
                migrations: [__dirname + '/migrations/*.ts'],
                synchronize: false,
                ssl: {
                    rejectUnauthorized: false
                }
            }),
            inject: [ConfigService]
        })
    ]
})
export class DbModule { }
