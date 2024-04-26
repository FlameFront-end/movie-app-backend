import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './entities/user.entity'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MoviesModule } from '../movies/movies.module'
import { CommentEntity } from '../comments/entities/comment.entity'
import { MovieEntity } from '../movies/entities/movie.entity'
import { TelegramService } from '../telegram/telegram.service'
import { TelegramModule } from '../telegram/telegram.module'

@Module({
	imports: [
		MoviesModule,
		TelegramModule,
		TypeOrmModule.forFeature([UserEntity, CommentEntity, MovieEntity]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get('JWT_SECRET'),
				signOptions: { expiresIn: '30d' }
			}),
			inject: [ConfigService]
		})
	],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService]
})
export class UserModule {}
