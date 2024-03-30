import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class UploadEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	fileLink: string
}
