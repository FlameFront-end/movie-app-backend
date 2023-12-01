import {
	Controller,
	Post,
	UseInterceptors,
	UploadedFile,
	ParseFilePipe,
	MaxFileSizeValidator,
	Get
} from '@nestjs/common'
import { MoviesService } from './movies.service'
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { fileStorage } from './storage'

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
			storage: fileStorage
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
				}
			}
		}
	})
	create(
		@UploadedFile(
			new ParseFilePipe({
				validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 })]
			})
		)
		file: Express.Multer.File
	) {
		return file
	}
}
