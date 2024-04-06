import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn
} from 'typeorm'
import { UserEntity } from '../../user/entities/user.entity'
import { MovieEntity } from '../../movies/entities/movie.entity'

@Entity('comment')
export class CommentEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	text: string

	@ManyToOne(() => UserEntity, user => user.comments)
	user: UserEntity

	@ManyToOne(() => MovieEntity, movie => movie.comments)
	movie: MovieEntity

	@CreateDateColumn()
	createdAt: Date
}
