import { diskStorage } from 'multer'

const generateId = () =>
	Array(18)
		.fill(null)
		.map(() => Math.round(Math.random() * 16).toString(16))
		.join('')

const normalizeFileName = (req, file, callback) => {
	const fileExtName = file.originalname.split('.').pop()

	callback(null, `${generateId()}.${fileExtName}`)
}

export const movieStorage = diskStorage({
	destination: './uploads/movies',
	filename: normalizeFileName
})

export const avaStorage = diskStorage({
	destination: './uploads/ava',
	filename: normalizeFileName
})

export const actorStorage = diskStorage({
	destination: './uploads/actors',
	filename: normalizeFileName
})
