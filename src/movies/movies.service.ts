import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MovieEntity } from './entities/movie.entity'
import { FindOneOptions, Repository } from 'typeorm'
import { CreateMovieDto } from './dto/create-movie.dto'
import { UpdateMovieDto } from './dto/update-movie.dto'

@Injectable()
export class MoviesService {
	constructor(
		@InjectRepository(MovieEntity)
		private repository: Repository<MovieEntity>
	) {}

	async create(createMovieDto: CreateMovieDto) {
		return this.repository.save({
			...createMovieDto
		})
	}

	findAll() {
		return this.repository.find()
	}

	async getMovieById(id: number): Promise<MovieEntity> | null {
		const options: FindOneOptions<MovieEntity> = {
			where: { id }
		}

		const movie = await this.repository.findOne(options)
		if (!movie) {
			throw new NotFoundException('Фильм не был найден')
		}
		return movie
	}

	async updateMovie(
		id: number,
		updateMovieDto: UpdateMovieDto
	): Promise<MovieEntity> {
		const movie = await this.repository.findOne({ where: { id } })
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
