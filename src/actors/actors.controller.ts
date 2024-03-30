import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common'
import { ActorsService } from './actors.service'
import { CreateActorDto } from './dto/create-actor.dto'
import { UpdateActorDto } from './dto/update-actor.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { actorStorage } from '../storage'
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'

@ApiTags('actors')
@Controller('actors')
export class ActorsController {
	constructor(private readonly actorsService: ActorsService) {}

	@UseInterceptors(
		FileInterceptor('ava', {
			storage: actorStorage
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
				full_name: {
					type: 'string'
				}
			}
		}
	})
	@Post()
	create(
		@UploadedFile()
		ava: Express.Multer.File,
		@Body() createActorDto: CreateActorDto
	) {
		return this.actorsService.create({ ...createActorDto, ava })
	}

	@Get()
	findAll() {
		return this.actorsService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.actorsService.findOne(+id)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateActorDto: UpdateActorDto) {
		return this.actorsService.update(+id, updateActorDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.actorsService.remove(+id)
	}
}
