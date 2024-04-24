import {
	HttpException,
	HttpStatus,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MovieEntity } from './entities/movie.entity'
import { ILike, Repository } from 'typeorm'
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
		console.log('createMovieDto.onlySubscribe', createMovieDto.onlySubscribe)
		console.log('createMovieDto', createMovieDto)

		const newMovie = this.repository.create({
			...createMovieDto,
			onlySubscribe: createMovieDto.onlySubscribe === 'true'
		})

		const actors = await this.actorRepository.findByIds(createMovieDto.actors)

		newMovie.actors = actors

		return this.repository.save(newMovie)
	}

	findAll() {
		return this.repository.find({
			relations: ['actors', 'comments', 'comments.user'],
			order: { createdAt: 'DESC' }
		})
	}

	async findAllPopular() {
		return await this.repository.find({
			order: { viewCount: 'DESC' }
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

		movie.viewCount = movie.viewCount + 1
		await this.repository.save(movie)

		return movie
	}

	async searchByTitle(title: string): Promise<MovieEntity[]> {
		return await this.repository.find({ where: { title: ILike(`%${title}%`) } })
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

		movie.actors = updateMovieDto.actors

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
