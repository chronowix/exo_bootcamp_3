import mongoose from 'mongoose';

//TODO: connecter à MongoDB avec l'URI depuis le fichier .env
export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log('MongoDB Connected');
    } catch (error) {
        console.log("DB connection failed");
        process.exit(1);
    }
}