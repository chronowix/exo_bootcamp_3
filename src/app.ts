import express from 'express';
import cors from 'cors';
import morgan  from 'morgan';
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { errorHandler } from './middleware/errorMiddleware.js'

const app = express();

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'));

//routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.use(errorHandler); //gestion des erreurs de l'appli

export default app;