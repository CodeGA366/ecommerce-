//imports 
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import sequelize from './config/database';
import authRoutes from './routes/authRoutes';
import User from './models/User'; // Import the User model
import Product from './models/Product'; // Import the Product model

dotenv.config();

const app = express();

// Enable CORS
app.use(cors());

app.use(express.json());

// Create the uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Serve static files from the uploads directory
app.use('/uploads', express.static(uploadsDir));

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

// Synchronize the models with the database
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});