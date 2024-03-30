import { Module } from '@nestjs/common'
import { MoviesModule } from './movies/movies.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MovieEntity } from './movies/entities/movie.entity'
import { AuthModule } from './auth/auth.module'
import { UserEntity } from './user/entities/user.entity'
import { UserModule } from './user/user.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { SocketService } from './socket/socket.service'
import { UploadModule } from './upload/upload.module'
import { UploadEntity } from './upload/entities/upload.entity'

@Module({
	imports: [
		UserModule,
		AuthModule,
		MoviesModule,
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				host: configService.get('DATABASE_HOST'),
				username: configService.get('DATABASE_USERNAME'),
				password: configService.get('DATABASE_PASSWORD'),
				database: configService.get('DATABASE_NAME'),
				entities: [UserEntity, MovieEntity, UploadEntity],
				synchronize: true
			}),
			inject: [ConfigService]
		}),
		UploadModule
	],
	controllers: [],
	providers: [SocketService]
})
export class AppModule {}
