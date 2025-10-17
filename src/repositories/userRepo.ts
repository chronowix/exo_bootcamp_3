import { User, IUser } from '../models/userModel.js'

export class UserRepo{
    async create(userData: Partial<IUser>): Promise<IUser> {
        const user = new User(userData);
        return user.save();
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return User.findOne({email});
    }

    async getById(id: string): Promise<IUser | null> {
        return User.findById(id);
    }

    async getAll(): Promise<IUser[]> {
        return User.find();
    }

    async update(id: string, data: Partial<IUser>): Promise<IUser | null> {
        return User.findByIdAndUpdate(id, data, {new: true});
    }

    async delete(id: string): Promise<IUser | null> {
        return User.findByIdAndDelete(id);
    }
}
