import { Controller, Post, UseGuards, Request } from '@nestjs/common'
import { ApiBody } from '@nestjs/swagger'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { AuthGuard } from '@nestjs/passport'

@Controller('auth')
export class AuthController {
	@UseGuards(AuthGuard('local'))
	@Post('login')
	@ApiBody({ type: CreateUserDto })
	async login(@Request() req) {
		return req.user
	}
}
