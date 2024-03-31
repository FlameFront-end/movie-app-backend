import { Module } from '@nestjs/common'
import { MoviesService } from './movies.service'
import { MoviesController } from './movies.controller'
import { MovieEntity } from './entities/movie.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ActorEntity } from '../actors/entities/actor.entity'

@Module({
	controllers: [MoviesController],
	providers: [MoviesService],
	imports: [TypeOrmModule.forFeature([MovieEntity, ActorEntity])],
	exports: [MoviesService]
})
export class MoviesModule {}
