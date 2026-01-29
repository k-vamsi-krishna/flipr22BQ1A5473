import express from 'express';
import cors from 'cors';
import './database.js';
import contactRoutes from './routes/contacts.js';
import projectRoutes from './routes/projects.js';
import clientRoutes from './routes/clients.js';
import subscriberRoutes from './routes/subscribers.js';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
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
  res.json({ status: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
