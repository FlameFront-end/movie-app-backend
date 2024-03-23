import {
	Controller,
	Post,
	Body,
	UsePipes,
	ValidationPipe,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { avaStorage } from '../storage'

@Controller('user')
@ApiTags('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	@UseInterceptors(
		FileInterceptor('ava', {
			storage: avaStorage
		})
	)
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				ava: {
					type: 'string',
					format: 'binary'
				},
				nick: {
					type: 'string'
				},
				email: {
					type: 'string'
				},
				password: {
					type: 'string'
				}
			}
		}
	})
	@UsePipes(new ValidationPipe())
	create(
		@UploadedFile()
		ava: Express.Multer.File,
		@Body() createUserDto: CreateUserDto
	) {
		return this.userService.create({ ...createUserDto, ava })
	}
}
