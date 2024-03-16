import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MovieEntity } from './entities/movie.entity'
import { FindOneOptions, Repository } from 'typeorm'
import { CreateMovieDto } from './dto/create-movie.dto'

@Injectable()
export class MoviesService {
	constructor(
		@InjectRepository(MovieEntity)
		private repository: Repository<MovieEntity>
	) {}

	async create(createMovieDto: CreateMovieDto) {
		return this.repository.save({
			title: createMovieDto.title,
			description: createMovieDto.description,
			w500image: createMovieDto.w500image,
			actors: createMovieDto.actors
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
}
