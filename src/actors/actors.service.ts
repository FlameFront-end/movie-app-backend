import { Injectable } from '@nestjs/common'
import { CreateActorDto } from './dto/create-actor.dto'
import { UpdateActorDto } from './dto/update-actor.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ActorEntity } from './entities/actor.entity'

@Injectable()
export class ActorsService {
	constructor(
		@InjectRepository(ActorEntity)
		private readonly actorRepository: Repository<ActorEntity>
	) {}
	create(createActorDto: CreateActorDto) {
		return this.actorRepository.save(createActorDto)
	}

	findAll() {
		return this.actorRepository.find()
	}

	findOne(id: number) {
		return this.actorRepository.findOne({ where: { id } })
	}

	update(id: number, updateActorDto: UpdateActorDto) {
		return this.actorRepository.update(id, updateActorDto)
	}

	remove(id: number) {
		return this.actorRepository.delete(id)
	}
}
