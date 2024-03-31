import { ApiProperty } from '@nestjs/swagger'

export class CreateMovieDto {
	@ApiProperty()
	readonly title: string

	@ApiProperty()
	readonly description: string

	@ApiProperty({ type: [String] })
	readonly tags: string[]

	@ApiProperty({ type: [Number] })
	readonly actors: number[]

	@ApiProperty()
	readonly posterImage: string

	@ApiProperty()
	readonly mainImage: string

	@ApiProperty()
	readonly trailerVideo: string

	@ApiProperty()
	readonly mainVideo: string
}
