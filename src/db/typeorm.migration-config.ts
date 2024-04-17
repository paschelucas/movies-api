import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";
import { UserEntity } from "./entities/user.entity";
import { MovieEntity } from "./entities/movie.entity.ts";

config()

const configService = new ConfigService()
const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: configService.get<string>('PRD_DB_HOST'),
    port: +configService.get<number>('PRD_DB_PORT'),
    username: configService.get<string>('PRD_DB_USERNAME'),
    password: configService.get<string>('PRD_DB_PASSWORD'),
    database: configService.get<string>('PRD_DB_NAME'),
    url: configService.get<string>('PRD_DB_EXTERNAL_URL'),
    entities: [UserEntity, MovieEntity],
    migrations: [__dirname + '/migrations/*.ts'],
    synchronize: false,
    ssl: {
        rejectUnauthorized: false
    }
}

export default new DataSource(dataSourceOptions)