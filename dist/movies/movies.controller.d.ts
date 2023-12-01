/// <reference types="multer" />
import { MoviesService } from './movies.service';
export declare class MoviesController {
    private readonly moviesService;
    constructor(moviesService: MoviesService);
    findAll(): Promise<import("./entities/movie.entity").MovieEntity[]>;
    create(file: Express.Multer.File): Express.Multer.File;
}
