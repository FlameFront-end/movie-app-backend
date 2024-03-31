import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'
import { ActorEntity } from '../../actors/entities/actor.entity'

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

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updateAt: Date

	@DeleteDateColumn()
	deleteAt?: Date

	@ManyToMany(() => ActorEntity, { eager: true })
	@JoinTable()
	actors: any[]
}
