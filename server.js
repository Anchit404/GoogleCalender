import express, { json } from 'express';
import { config } from 'dotenv';
import connectDB from './config/db.js';
import googleRoutes from './routes/googleRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Load environment variables
config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Routes
app.use('/api/google', googleRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
