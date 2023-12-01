import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('movies')
export class MovieEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	title: string

	@Column()
	description: string

	@Column()
	originalImage: string

	@Column()
	w500lImage: string

	@Column()
	rating: string

	@Column()
	actors: string

	@Column()
	releaseDate: string
}
