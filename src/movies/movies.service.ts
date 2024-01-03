import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MovieEntity } from './entities/movie.entity'
import { Repository } from 'typeorm'

@Injectable()
export class MoviesService {
	constructor(
		@InjectRepository(MovieEntity)
		private repository: Repository<MovieEntity>
	) {}
	async create(w500image: Express.Multer.File) {
		return this.repository.save({
			w500image: w500image.filename
		})
	}

	findAll() {
		return this.repository.find()
	}
}
