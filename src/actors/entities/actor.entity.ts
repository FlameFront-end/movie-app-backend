import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm'

@Entity()
export class ActorEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	fullName: string

	@Column()
	ava: string

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
