import { CreateMovieDto } from './dto/create-movie.dto';
import { MovieEntity } from './entities/movie.entity';
import { Repository } from 'typeorm';
export declare class MoviesService {
    private repository;
    constructor(repository: Repository<MovieEntity>);
    create(createMovieDto: CreateMovieDto): string;
    findAll(): Promise<MovieEntity[]>;
}
