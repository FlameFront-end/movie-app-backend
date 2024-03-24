import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn
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

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updateAt: Date

	@DeleteDateColumn()
	deleteAt?: Date
}
