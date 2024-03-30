import { Controller, Post, Get, Body, Param, Put, Delete } from '@nestjs/common'
import { MoviesService } from './movies.service'
import { ApiTags } from '@nestjs/swagger'
import { CreateMovieDto } from './dto/create-movie.dto'
import { UpdateMovieDto } from './dto/update-movie.dto'

@Controller('movies')
@ApiTags('movies')
export class MoviesController {
	constructor(private readonly moviesService: MoviesService) {}

	@Get()
	findAll() {
		return this.moviesService.findAll()
	}

	@Post()
	async create(
		@Body()
		createMovieDto: CreateMovieDto
	) {
		return await this.moviesService.create(createMovieDto)
	}

	@Get(':id')
	findOne(@Param('id') id: number) {
		return this.moviesService.getMovieById(id)
	}

	@Put(':id')
	async update(
		@Param('id')
		id: number,
		@Body() updateMovieDto: UpdateMovieDto
	) {
		return await this.moviesService.updateMovie(id, updateMovieDto)
	}

	@Delete(':id')
	async remove(@Param('id') id: number) {
		return await this.moviesService.deleteMovie(id)
	}
}
