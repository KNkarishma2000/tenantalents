import cors from 'cors';

const allowedOrigins = [
  'http://localhost:3000',
  'https://your-vercel-frontend.vercel.app', // Replace with your actual Vercel domain
];

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
});
