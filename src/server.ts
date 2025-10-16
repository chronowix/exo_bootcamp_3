import { config } from 'dotenv';
import { connectDB } from './config/database.js'
import app from './app.js';

config();

const PORT = process.env.PORT || 5000;

//TODO: connecter à la BDD et lancer le server
connectDB();
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));