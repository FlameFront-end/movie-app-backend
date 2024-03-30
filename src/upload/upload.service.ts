import { Injectable } from '@nestjs/common'
import { CreateUploadDto } from './dto/create-upload.dto'
import { UpdateUploadDto } from './dto/update-upload.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '../user/entities/user.entity'
import { Repository } from 'typeorm'
import { UploadEntity } from './entities/upload.entity'

@Injectable()
export class UploadService {
	constructor(
		@InjectRepository(UploadEntity)
		private readonly repository: Repository<UploadEntity>
	) {}

	upload(file: Express.Multer.File) {
		return this.repository.save({
			fileLink: `http://localhost:4000/uploads/files/${file.filename}`
		})
	}
}
