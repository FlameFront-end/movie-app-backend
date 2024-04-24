import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany
} from 'typeorm'
import { MovieEntity } from '../../movies/entities/movie.entity'
import { CommentEntity } from '../../comments/entities/comment.entity'

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

	@Column({ default: false })
	subscribe: boolean

	@ManyToMany(() => MovieEntity)
	@JoinTable()
	favorites: MovieEntity[]

	@OneToMany(() => CommentEntity, comment => comment.user)
	comments: CommentEntity[]

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
