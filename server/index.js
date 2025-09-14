import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/db.js';
import userRoute from './routes/user.route.js';
import courseRoute from './routes/course.route.js';
import mediaRoute from './routes/media.route.js';
import purchaseRoute from './routes/purchaseCourse.route.js';
import courseProgressRoute from './routes/courseProgress.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import serverless from 'serverless-http'; // needed for Vercel

dotenv.config();

// Initialize DB once and reuse connection
let isDBConnected = false;
const initDB = async () => {
  if (!isDBConnected) {
    await connectDB();
    isDBConnected = true;
  }
};

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

// Routes
app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: "API is working" });
});

app.use('/api/v1/media', mediaRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/course', courseRoute);
app.use('/api/v1/purchase', purchaseRoute);
app.use('/api/v1/progress', courseProgressRoute);

// Vercel serverless handler
export default async (req, res) => {
  await initDB(); // ensure DB is connected
  return serverless(app)(req, res);
};
