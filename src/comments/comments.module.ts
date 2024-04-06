import { Module } from '@nestjs/common'
import { CommentsService } from './comments.service'
import { CommentsController } from './comments.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '../user/entities/user.entity'
import { CommentEntity } from './entities/comment.entity'
import { MovieEntity } from '../movies/entities/movie.entity'

@Module({
	imports: [TypeOrmModule.forFeature([CommentEntity, UserEntity, MovieEntity])],
	controllers: [CommentsController],
	providers: [CommentsService]
})
export class CommentsModule {}
