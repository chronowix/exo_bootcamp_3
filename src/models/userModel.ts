import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from "bcrypt";

//déclaration du user
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

//TODO: hasher le mdp avec bcrypt avant sauvegarde du user
userSchema.pre('save', async function (next) {
    const user = this as IUser;

    //si mdp pas modifié, ne rien faire
    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        next();
    } catch (err) {
        next(err as Error);
    }
});

//instance pour comparer mdp clair avec hash
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
}

export const User = mongoose.model<IUser>('User', userSchema);