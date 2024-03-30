import { ApiProperty } from '@nestjs/swagger'

export class CreateActorDto {
	@ApiProperty()
	readonly fullName: string

	@ApiProperty()
	readonly ava: string
}
