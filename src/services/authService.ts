import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser, User } from '../models/userModel.js';
import AppError from '../utils/AppError.js';

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export class AuthService {

    // register user
    async register(name: string, email: string, password: string): Promise<Omit<IUser, 'password'>> {
        const exists = await User.findOne({ email });
        if (exists) {
            throw new AppError("L'utilisateur existe déjà!", 400, "EMAIL_ALREADY_EXISTS");
        }

        const hashed = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashed });
        await newUser.save();

        // convert to plain JS object and remove password
        const userPlain = JSON.parse(JSON.stringify(newUser));
        const { password: _, ...userWithoutPassword } = userPlain;
        return userWithoutPassword;
    }

    // login user
    async login(email: string, password: string): Promise<string> {
        const user = await User.findOne({ email });
        if (!user) {
            throw new AppError("Email ou mot de passe invalide!", 401, "INVALID_CREDENTIALS");
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new AppError("Mot de passe invalide!", 401, "INVALID_CREDENTIALS");
        }

        return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
    }

    verifyToken(token: string): { id: string, email: string } {
        return jwt.verify(token, JWT_SECRET) as { id: string, email: string };
    }
}
