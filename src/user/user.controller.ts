import {
	Controller,
	Post,
	Body,
	UsePipes,
	ValidationPipe,
	UploadedFile,
	UseInterceptors,
	Patch,
	UseGuards,
	Request,
	UnauthorizedException,
	Param,
	Delete,
	Get
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { avaStorage } from '../storage'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import * as argon2 from 'argon2'
import { ResetPasswordDto } from './dto/reset-password.dto'
import { MovieEntity } from '../movies/entities/movie.entity'
import { TelegramService } from '../telegram/telegram.service'

@Controller('user')
@ApiTags('user')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly telegramService: TelegramService
	) {}

	@Post()
	@UseInterceptors(
		FileInterceptor('ava', {
			storage: avaStorage
		})
	)
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		schema: {
			type: 'object',
			properties: {
				ava: {
					type: 'string',
					format: 'binary'
				},
				nick: {
					type: 'string'
				},
				email: {
					type: 'string'
				},
				password: {
					type: 'string'
				}
			}
		}
	})
	@UsePipes(new ValidationPipe())
	create(
		@UploadedFile()
		ava: Express.Multer.File,
		@Body() createUserDto: CreateUserDto
	) {
		const user = this.userService.create({
			...createUserDto,
			ava: `http://localhost:4000/uploads/ava/${ava.filename}`
		})

		this.telegramService.sendMessage(
			`Пользователь ${createUserDto.nick} зарегестрировался.`
		)

		return user
	}

	@Post('/buy')
	@UseGuards(JwtAuthGuard)
	byuSubscribe(@Request() req) {
		const user = this.userService.byuSubscribe(req.user.id)

		this.telegramService.sendMessage(
			`Пользователь c почтой ${req.user.email} купил MovieHub Premium`
		)

		return user
	}

	@Patch('reset-password')
	@UseGuards(JwtAuthGuard)
	async resetPassword(@Request() req, @Body() body: ResetPasswordDto) {
		const { old_password, new_password } = body
		const user = await this.userService.getUserByEmail(req.user.email)

		const isOldPasswordValid = await argon2.verify(user.password, old_password)

		if (isOldPasswordValid) {
			await this.userService.resetPassword(user, new_password)
			return { message: 'Password reset successful' }
		} else {
			throw new UnauthorizedException('Old password is incorrect')
		}
	}

	@Post('favorites/:movieId')
	@UseGuards(JwtAuthGuard)
	async addToFavorites(
		@Request() req,
		@Param('movieId') movieId: number
	): Promise<MovieEntity> {
		return this.userService.addToFavorites(req.user.id, movieId)
	}

	@Delete('favorites/:movieId')
	@UseGuards(JwtAuthGuard)
	async removeFromFavorites(
		@Request() req,
		@Param('movieId') movieId: number
	): Promise<MovieEntity> {
		return this.userService.removeFromFavorites(req.user.id, movieId)
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.userService.findBuId(+id)
	}

	@Get()
	findAll() {
		return this.userService.findAll()
	}
}
