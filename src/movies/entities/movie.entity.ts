import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'
import { ActorEntity } from '../../actors/entities/actor.entity'
import { CommentEntity } from '../../comments/entities/comment.entity'

@Entity('movies')
export class MovieEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	title: string

	@Column()
	description: string

	@Column({ type: 'text', array: true, nullable: true })
	tags: string[]

	@Column()
	posterImage: string

	@Column()
	mainImage: string

	@Column()
	trailerVideo: string

	@Column()
	mainVideo: string

	@Column({ default: 0 })
	viewCount: number

	@Column({ nullable: true })
	onlySubscribe: boolean

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updateAt: Date

	@DeleteDateColumn()
	deleteAt?: Date

	@ManyToMany(() => ActorEntity, { eager: true })
	@JoinTable()
	actors: any[]

	@OneToMany(() => CommentEntity, comment => comment.movie, { eager: true })
	comments: CommentEntity[]
}
