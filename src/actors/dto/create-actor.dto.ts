import { ApiProperty } from '@nestjs/swagger'

export class CreateActorDto {
	@ApiProperty()
	readonly full_name: string

	@ApiProperty()
	readonly ava: Express.Multer.File
}
