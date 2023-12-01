import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
export declare class UsersService {
    private repository;
    constructor(repository: Repository<UserEntity>);
    findByEmail(email: string): Promise<UserEntity>;
    findById(id: number): Promise<UserEntity>;
}
