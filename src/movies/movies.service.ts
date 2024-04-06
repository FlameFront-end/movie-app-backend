import {
	HttpException,
	HttpStatus,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MovieEntity } from './entities/movie.entity'
import { FindOneOptions, Repository } from 'typeorm'
import { CreateMovieDto } from './dto/create-movie.dto'
import { UpdateMovieDto } from './dto/update-movie.dto'
import { ActorEntity } from '../actors/entities/actor.entity'

@Injectable()
export class MoviesService {
	constructor(
		@InjectRepository(MovieEntity)
		private repository: Repository<MovieEntity>,
		@InjectRepository(ActorEntity)
		private actorRepository: Repository<ActorEntity>
	) {}

	async create(createMovieDto: CreateMovieDto) {
		const newMovie = this.repository.create(createMovieDto)

		const actors = await this.actorRepository.findByIds(createMovieDto.actors)

		if (actors.length !== createMovieDto.actors.length) {
			throw new HttpException(
				'One or more skills not found',
				HttpStatus.BAD_REQUEST
			)
		}

		newMovie.actors = actors

		return this.repository.save(newMovie)
	}

	findAll() {
		return this.repository.find({
			relations: ['actors', 'comments', 'comments.user']
		})
	}

	async getMovieById(id: number): Promise<MovieEntity> | null {
		const movie = await this.repository.findOne({
			where: { id },
			relations: ['actors', 'comments', 'comments.user']
		})

		if (!movie) {
			throw new NotFoundException('Фильм не был найден')
		}
		return movie
	}

	async updateMovie(
		id: number,
		updateMovieDto: UpdateMovieDto
	): Promise<MovieEntity> {
		const movie = await this.repository.findOne({
			where: { id },
			relations: ['actors', 'comments', 'comments.user']
		})
		if (!movie) {
			throw new Error('Movie not found')
		}
		Object.assign(movie, updateMovieDto)

		return await this.repository.save(movie)
	}

	async deleteMovie(id: number): Promise<MovieEntity> {
		const movie = await this.repository.findOne({ where: { id } })

		if (!movie) {
			throw new Error('Movie not found')
		}

		await this.repository.delete(id)

		return movie
	}
}
