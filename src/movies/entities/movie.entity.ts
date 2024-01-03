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
	w500image: string

	@DeleteDateColumn()
	deleteAt?: Date
}
