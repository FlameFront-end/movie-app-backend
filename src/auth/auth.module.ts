import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './strategies/local.strategy'
import { UsersModule } from '../users/users.module'

@Module({
	imports: [UsersModule, PassportModule],
	controllers: [AuthController, LocalStrategy],
	providers: [AuthService]
})
export class AuthModule {}
