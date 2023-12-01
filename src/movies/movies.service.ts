import { Injectable } from '@nestjs/common'
import { CreateMovieDto } from './dto/create-movie.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { MovieEntity } from './entities/movie.entity'
import { Repository } from 'typeorm'

@Injectable()
export class MoviesService {
	constructor(
		@InjectRepository(MovieEntity)
		private repository: Repository<MovieEntity>
	) {}
	create(createMovieDto: CreateMovieDto) {
		return 'This action adds a new movie'
	}

	findAll() {
		return this.repository.find()
	}
}
