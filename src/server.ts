import { config } from 'dotenv';
config(); // doit être appelé avant connectDB

import { connectDB } from './config/database.js';
import app from './app.js';

const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
