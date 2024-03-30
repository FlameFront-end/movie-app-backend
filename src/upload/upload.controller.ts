import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common'
import { UploadService } from './upload.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBody, ApiConsumes } from '@nestjs/swagger'
import { fileStorage } from '../storage'

@Controller('upload')
export class UploadController {
	constructor(private readonly uploadService: UploadService) {}

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
	upload(
		@UploadedFile()
		file: Express.Multer.File
	) {
		return this.uploadService.upload(file)
	}
}
