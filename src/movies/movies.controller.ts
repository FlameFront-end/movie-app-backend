import {
	Controller,
	Post,
	UseInterceptors,
	Get,
	Body,
	Param,
	Put,
	Delete,
	UploadedFiles
} from '@nestjs/common'
import { MoviesService } from './movies.service'
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { movieStorage } from '../storage'
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
		FileFieldsInterceptor(
			[
				{ name: 'posterImage', maxCount: 1 },
				{ name: 'mainImage', maxCount: 1 },
				{ name: 'trailerVideo', maxCount: 1 },
				{ name: 'mainVideo', maxCount: 1 }
			],
			{
				storage: movieStorage
			}
		)
	)
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				posterImage: {
					type: 'array',
					items: {
						type: 'string',
						format: 'binary'
					}
				},
				mainImage: {
					type: 'array',
					items: {
						type: 'string',
						format: 'binary'
					}
				},
				trailerVideo: {
					type: 'array',
					items: {
						type: 'string',
						format: 'binary'
					}
				},
				mainVideo: {
					type: 'array',
					items: {
						type: 'string',
						format: 'binary'
					}
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
		@UploadedFiles()
		files: {
			posterImage: Express.Multer.File[]
			mainImage: Express.Multer.File[]
			trailerVideo: Express.Multer.File[]
			mainVideo: Express.Multer.File[]
		},
		@Body() createMovieDto: CreateMovieDto
	) {
		const { posterImage, mainImage, trailerVideo, mainVideo } = files
		return await this.moviesService.create({
			...createMovieDto,
			posterImage: posterImage[0].filename,
			mainImage: mainImage[0].filename,
			trailerVideo: trailerVideo[0].filename,
			mainVideo: mainVideo[0].filename
		})
	}
	@Get(':id')
	findOne(@Param('id') id: number) {
		return this.moviesService.getMovieById(id)
	}

	@Put(':id')
	@UseInterceptors(
		FileFieldsInterceptor(
			[
				{ name: 'posterImage', maxCount: 1 },
				{ name: 'mainImage', maxCount: 1 },
				{ name: 'trailerVideo', maxCount: 1 },
				{ name: 'mainVideo', maxCount: 1 }
			],
			{
				storage: movieStorage
			}
		)
	)
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				posterImage: {
					type: 'array',
					items: {
						type: 'string',
						format: 'binary'
					}
				},
				mainImage: {
					type: 'array',
					items: {
						type: 'string',
						format: 'binary'
					}
				},
				trailerVideo: {
					type: 'array',
					items: {
						type: 'string',
						format: 'binary'
					}
				},
				mainVideo: {
					type: 'array',
					items: {
						type: 'string',
						format: 'binary'
					}
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
		@UploadedFiles()
		files: {
			posterImage: Express.Multer.File[]
			mainImage: Express.Multer.File[]
			trailerVideo: Express.Multer.File[]
			mainVideo: Express.Multer.File[]
		},
		@Param('id') id: number,
		@Body() updateMovieDto: UpdateMovieDto
	) {
		const { posterImage, mainImage, trailerVideo, mainVideo } = files

		return await this.moviesService.updateMovie(id, {
			...updateMovieDto,
			posterImage: posterImage[0].filename,
			mainImage: mainImage[0].filename,
			trailerVideo: trailerVideo[0].filename,
			mainVideo: mainVideo[0].filename
		})
	}

	@Delete(':id')
	async remove(@Param('id') id: number) {
		return await this.moviesService.deleteMovie(id)
	}
}
