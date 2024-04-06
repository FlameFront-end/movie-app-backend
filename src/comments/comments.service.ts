import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateCommentDto } from './dto/create-comment.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '../user/entities/user.entity'
import { Repository } from 'typeorm'
import { CommentEntity } from './entities/comment.entity'
import { MovieEntity } from '../movies/entities/movie.entity'

@Injectable()
export class CommentsService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
		@InjectRepository(CommentEntity)
		private readonly commentRepository: Repository<CommentEntity>,
		@InjectRepository(MovieEntity)
		private readonly movieRepository: Repository<MovieEntity>
	) {}

	async create(createCommentDto: CreateCommentDto) {
		const { userId, movieId, text } = createCommentDto

		const user = await this.userRepository.findOne({ where: { id: userId } })

		if (!user) {
			throw new HttpException(
				`User with id ${userId} not found`,
				HttpStatus.NOT_FOUND
			)
		}

		const movie = await this.movieRepository.findOne({ where: { id: movieId } })

		if (!movie) {
			throw new HttpException(
				`Movie with id ${movieId} not found`,
				HttpStatus.NOT_FOUND
			)
		}

		const comment = this.commentRepository.create({
			text,
			user,
			movie
		})

		await this.commentRepository.save(comment)

		return comment
	}

	async findAll(movieId: number) {
		return await this.commentRepository.find({
			where: { movie: { id: movieId } },
			relations: ['user']
		})
	}
}
