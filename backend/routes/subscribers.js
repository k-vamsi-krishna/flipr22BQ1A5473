import express from 'express';
import { Subscriber } from '../models/Subscriber.js';

const router = express.Router();

// Subscribe to newsletter
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const subscriber = await Subscriber.create({ email });
    res.status(201).json(subscriber);
  } catch (error) {
    if (error.status === 400) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
});

// Get all subscribers
router.get('/', async (req, res) => {
  try {
    const subscribers = await Subscriber.getAll();
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single subscriber
router.get('/:id', async (req, res) => {
  try {
    const subscriber = await Subscriber.getById(req.params.id);
    if (!subscriber) {
      return res.status(404).json({ error: 'Subscriber not found' });
    }
    res.json(subscriber);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Unsubscribe
router.delete('/:id', async (req, res) => {
  try {
    await Subscriber.delete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
