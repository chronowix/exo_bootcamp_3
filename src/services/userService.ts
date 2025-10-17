import {IUser, User} from '../models/userModel.js'
import AppError from '../utils/AppError.js'
import {UserRepo} from "../repositories/userRepo.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserService {
    private repo: UserRepo;

    constructor() {
        this.repo = new UserRepo();
    }
    //TODO: getAllUsers
    async getAllUsers(): Promise<IUser[]> {
        return this.repo.getAll();
    }
    //TODO: getUserId
    async getUserId(id: string): Promise<IUser> {
        const user = await this.repo.getById(id);
        if (!user) throw new AppError('Utilisateur introuvable', 404, 'USER_NOT_FOUND');
        return user;
    }
    //TODO: updateUser
    async updateUser(id: string, data: Partial<IUser>): Promise<IUser> {
        const updated = await this.repo.update(id, data);
        if (!updated) throw new AppError('Utilisateur introuvable', 404, 'USER_NOT_FOUND')
        return updated;
    }
    //TODO: deleteUser
    async deleteUser(id: string): Promise<IUser> {
        const deleted = await this.repo.delete(id);
        if (!deleted) throw new AppError('Utilisateur introuvable', 404, 'USER_NOT_FOUND');
        return deleted;
    }
}


