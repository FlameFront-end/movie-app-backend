import {
	Column,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn
} from 'typeorm'

@Entity('movies')
export class MovieEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	title: string

	@Column()
	description: string

	@Column()
	w500image: string

	@Column()
	actors: string

	@DeleteDateColumn()
	deleteAt?: Date
}
