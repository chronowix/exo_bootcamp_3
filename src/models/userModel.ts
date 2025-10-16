import mongoose, { Schema, Document } from 'mongoose';

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

export default mongoose.model<IUser>('User', userSchema);