import {
	Controller,
	Post,
	UseInterceptors,
	UploadedFile,
	Get,
	Body,
	Param,
	Put,
	Delete
} from '@nestjs/common'
import { MoviesService } from './movies.service'
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { moviesImage } from '../storage'
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
	@UseInterceptors(
		FileInterceptor('file', {
			storage: moviesImage
		})
	)
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				file: {
					type: 'string',
					format: 'binary'
				},
				title: {
					type: 'string'
				},
				description: {
					type: 'string'
				},
				actors: {
					type: 'array',
					items: {
						type: 'string'
					}
				}
			}
		}
	})
	async create(
		@UploadedFile()
		w500image: Express.Multer.File,
		@Body() createMovieDto: CreateMovieDto
	) {
		console.log('createMovieDto', createMovieDto)
		return await this.moviesService.create({
			...createMovieDto,
			w500image: w500image.filename
		})
	}

	@Get(':id')
	findOne(@Param('id') id: number) {
		return this.moviesService.getMovieById(id)
	}

	@Put(':id')
	@UseInterceptors(
		FileInterceptor('file', {
			storage: moviesImage
		})
	)
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				file: {
					type: 'string',
					format: 'binary'
				},
				title: {
					type: 'string'
				},
				description: {
					type: 'string'
				},
				actors: {
					type: 'array',
					items: {
						type: 'string'
					}
				}
			}
		}
	})
	async update(
		@UploadedFile()
		w500image: Express.Multer.File,
		@Param('id') id: number,
		@Body() updateMovieDto: UpdateMovieDto
	) {
		return await this.moviesService.updateMovie(id, {
			...updateMovieDto,
			w500image: w500image.filename
		})
	}

	@Delete(':id')
	async remove(@Param('id') id: number) {
		return await this.moviesService.deleteMovie(id)
	}
}
