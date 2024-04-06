import { ApiProperty } from '@nestjs/swagger'

export class CreateCommentDto {
	@ApiProperty()
	readonly userId: number

	@ApiProperty()
	readonly movieId: number

	@ApiProperty()
	readonly text: string
}
