import { ApiProperty } from '@nestjs/swagger'

export class CreateMovieDto {
	@ApiProperty()
	readonly title: string

	@ApiProperty()
	readonly description: string

	@ApiProperty()
	readonly w500image: string

	@ApiProperty()
	readonly actors: string
}
