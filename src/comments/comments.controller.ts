import { Controller, Get, Post, Body } from '@nestjs/common'
import { CommentsService } from './comments.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { ApiTags } from '@nestjs/swagger'

@Controller('comments')
@ApiTags('comments')
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) {}

	@Post()
	create(@Body() createCommentDto: CreateCommentDto) {
		return this.commentsService.create(createCommentDto)
	}

	@Get()
	findAll() {
		return this.commentsService.findAll()
	}
}
