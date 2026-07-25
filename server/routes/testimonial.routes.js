const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');

// GET /api/testimonials - list all testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().lean();
    res.json(testimonials);
  } catch (err) {
    console.error('Failed to fetch testimonials:', err);
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

// GET /api/testimonials/:id - get one testimonial by ID
router.get('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id).lean();
    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    res.json(testimonial);
  } catch (err) {
    console.error('Failed to fetch testimonial:', err);
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid testimonial ID' });
    }
    res.status(500).json({ error: 'Failed to fetch testimonial' });
  }
});

// POST /api/testimonials - create new testimonial
router.post('/', async (req, res) => {
  try {
    const { name, role, photoUrl, quote } = req.body;
    if (typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'Name is required and must be a nonempty string' });
    }
    if (typeof role !== 'string' || !role.trim()) {
      return res.status(400).json({ error: 'Role is required and must be a nonempty string' });
    }
    if (typeof photoUrl !== 'string' || !photoUrl.trim()) {
      return res.status(400).json({ error: 'Photo URL is required and must be a nonempty string' });
    }
    if (typeof quote !== 'string' || !quote.trim()) {
      return res.status(400).json({ error: 'Quote is required and must be a nonempty string' });
    }

    const newTestimonial = new Testimonial({ name: name.trim(), role: role.trim(), photoUrl: photoUrl.trim(), quote: quote.trim() });
    const saved = await newTestimonial.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Failed to create testimonial:', err);
    res.status(500).json({ error: 'Failed to create testimonial' });
  }
});

// PUT /api/testimonials/:id - update a testimonial by ID
router.put('/:id', async (req, res) => {
  try {
    const { name, role, photoUrl, quote } = req.body;

    // Validate fields if present
    const updates = {};
    if (name !== undefined) {
      if (typeof name !== 'string' || !name.trim()) {
        return res.status(400).json({ error: 'Name must be a nonempty string' });
      }
      updates.name = name.trim();
    }
    if (role !== undefined) {
      if (typeof role !== 'string' || !role.trim()) {
        return res.status(400).json({ error: 'Role must be a nonempty string' });
      }
      updates.role = role.trim();
    }
    if (photoUrl !== undefined) {
      if (typeof photoUrl !== 'string' || !photoUrl.trim()) {
        return res.status(400).json({ error: 'Photo URL must be a nonempty string' });
      }
      updates.photoUrl = photoUrl.trim();
    }
    if (quote !== undefined) {
      if (typeof quote !== 'string' || !quote.trim()) {
        return res.status(400).json({ error: 'Quote must be a nonempty string' });
      }
      updates.quote = quote.trim();
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!updatedTestimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    res.json(updatedTestimonial);
  } catch (err) {
    console.error('Failed to update testimonial:', err);
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid testimonial ID' });
    }
    res.status(500).json({ error: 'Failed to update testimonial' });
  }
});

// DELETE /api/testimonials/:id - delete a testimonial by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Testimonial.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    res.json({ message: 'Testimonial deleted' });
  } catch (err) {
    console.error('Failed to delete testimonial:', err);
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid testimonial ID' });
    }
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
});

module.exports = router;