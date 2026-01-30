import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './database.js';
import contactRoutes from './routes/contacts.js';
import projectRoutes from './routes/projects.js';
import clientRoutes from './routes/clients.js';
import subscriberRoutes from './routes/subscribers.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Parse CORS origins from environment
const corsOriginString = process.env.CORS_ORIGIN || 'http://localhost:3000,http://localhost:5173';
const corsOrigins = corsOriginString.split(',').map(origin => origin.trim());

// Middleware
app.use(cors({
  origin: corsOrigins,
  credentials: true,
}));
app.use(express.json());

// API Routes
app.use('/api/contacts', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/subscribers', subscriberRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running',
    environment: NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] Server running on http://0.0.0.0:${PORT}`);
  console.log(`Environment: ${NODE_ENV}`);
  console.log(`CORS origins: ${corsOrigins.join(', ')}`);
});
