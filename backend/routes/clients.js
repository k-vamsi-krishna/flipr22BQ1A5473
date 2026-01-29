import express from 'express';
import { Client } from '../models/Client.js';

const router = express.Router();

// Create client
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, company, feedback, rating, image } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const client = await Client.create({ name, email, phone, company, feedback, rating, image });
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all clients
router.get('/', async (req, res) => {
  try {
    const clients = await Client.getAll();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single client
router.get('/:id', async (req, res) => {
  try {
    const client = await Client.getById(req.params.id);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update client
router.put('/:id', async (req, res) => {
  try {
    const { name, email, phone, company, feedback, rating, image } = req.body;
    const client = await Client.update(req.params.id, { name, email, phone, company, feedback, rating, image });
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete client
router.delete('/:id', async (req, res) => {
  try {
    await Client.delete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
