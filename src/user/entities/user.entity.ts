import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	JoinTable,
	ManyToMany
} from 'typeorm'
import { MovieEntity } from '../../movies/entities/movie.entity'

@Entity('user')
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	email: string

	@Column()
	password: string

	@Column()
	nick: string

	@Column()
	ava: string

	@Column({ default: false })
	isAdmin: boolean

	@ManyToMany(() => MovieEntity)
	@JoinTable()
	favorites: MovieEntity[]

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
