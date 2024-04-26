import { Controller, Post, Body, Res } from '@nestjs/common'
import { Response } from 'express'
import { ApiTags } from '@nestjs/swagger'
import * as fs from 'fs'
import * as path from 'path'

@ApiTags('file')
@Controller('file')
export class FileController {
	@Post()
	createFile(@Body() dto: any, @Res() res: Response) {
		try {
			const directoryPath = path.join(__dirname, '../../uploads/files')
			if (!fs.existsSync(directoryPath)) {
				fs.mkdirSync(directoryPath, { recursive: true })
			}
			const fileName = `${Date.now()}-${Math.floor(Math.random() * 100000)}.txt`
			const filePath = path.join(directoryPath, fileName)

			fs.writeFileSync(filePath, dto.content)

			const fileContent = fs.readFileSync(filePath, 'utf-8')

			fs.unlinkSync(filePath)

			res.set('Content-Type', 'text/plain')
			return res.send(fileContent)
		} catch (error) {
			console.log('error', error)
			return res.status(500).send('Error creating file')
		}
	}
}
