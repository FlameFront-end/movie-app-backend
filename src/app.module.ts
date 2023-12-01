import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MoviesModule } from './movies/movies.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MovieEntity } from './movies/entities/movie.entity'
import { config } from 'dotenv'
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import * as process from 'process'
import {UserEntity} from "./users/entities/user.entity";

config()

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.DATABASE_HOST,
			port: 5432,
			username: process.env.DATABASE_USERNAME,
			password: process.env.DATABASE_PASSWORD,
			database: process.env.DATABASE_NAME,
			entities: [MovieEntity, UserEntity],
			synchronize: true
		}),
		MoviesModule,
		UsersModule,
		AuthModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
