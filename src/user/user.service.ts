import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './entities/user.entity'
import { Repository } from 'typeorm'
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { IUser } from '../types/types'
import { MovieEntity } from '../movies/entities/movie.entity'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
		@InjectRepository(MovieEntity)
		private readonly movieRepository: Repository<MovieEntity>,
		private readonly jwtService: JwtService
	) {}

	async create(createUserDto: CreateUserDto) {
		const existUser = await this.userRepository.findOne({
			where: {
				email: createUserDto.email
			}
		})

		if (existUser) {
			throw new BadRequestException('This email already exists')
		}

		const user = await this.userRepository.save({
			email: createUserDto.email,
			password: await argon2.hash(createUserDto.password),
			nick: createUserDto.nick,
			ava: createUserDto.ava,
			isAdmin: createUserDto.email === '5017_30@mail.ru'
		})

		const token = this.jwtService.sign({ email: createUserDto.email })

		return {
			...user,
			token
		}
	}

	async findOne(email: string) {
		return await this.userRepository.findOne({
			where: { email: email },
			relations: ['favorites']
		})
	}

	async findBuId(id: number) {
		return await this.userRepository.findOne({
			where: { id },
			relations: ['favorites']
		})
	}

	async findAll() {
		return await this.userRepository.find({ relations: ['favorites'] })
	}

	async getUserByEmail(email: string) {
		return await this.findOne(email)
	}

	async updatePassword(userId: number, newPassword: string): Promise<void> {
		await this.userRepository.update({ id: userId }, { password: newPassword })
	}

	async resetPassword(user: IUser, newPassword: string): Promise<void> {
		const hashedNewPassword = await argon2.hash(newPassword)
		await this.updatePassword(user.id, hashedNewPassword)
	}

	async addToFavorites(userId: number, movieId: number): Promise<void> {
		const user = await this.userRepository.findOne({ where: { id: userId } })
		const movie = await this.movieRepository.findOne({ where: { id: movieId } })

		if (!user || !movie) {
			throw new BadRequestException('User or movie not found')
		}

		return this.userRepository
			.createQueryBuilder()
			.relation(UserEntity, 'favorites')
			.of(user)
			.add(movie)
	}

	async removeFromFavorites(userId: number, movieId: number): Promise<void> {
		const user = await this.userRepository.findOne({ where: { id: userId } })
		if (!user) {
			throw new BadRequestException('User not found')
		}

		await this.userRepository
			.createQueryBuilder()
			.relation(UserEntity, 'favorites')
			.of(user)
			.remove(movieId)
	}
}
