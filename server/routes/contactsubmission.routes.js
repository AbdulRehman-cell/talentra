const express = require('express');
const router = express.Router();
const ContactSubmission = require('../models/ContactSubmission');

// Validate required fields helper
function validateContactSubmission(data) {
  const { name, email, phone, message } = data;
  if (
    !name || typeof name !== 'string' || !name.trim() ||
    !email || typeof email !== 'string' || !email.trim() ||
    !phone || typeof phone !== 'string' || !phone.trim() ||
    !message || typeof message !== 'string' || !message.trim()
  ) {
    return false;
  }
  return true;
}

// GET /api/contactsubmissions/ - list all with pagination (optional)
router.get('/', async (req, res) => {
  try {
    const submissions = await ContactSubmission.find().sort({ submittedAt: -1 }).exec();
    res.json(submissions);
  } catch (err) {
    console.error('GET /api/contactsubmissions error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /api/contactsubmissions/:id - get one by id
router.get('/:id', async (req, res) => {
  try {
    const submission = await ContactSubmission.findById(req.params.id).exec();
    if (!submission) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }
    res.json(submission);
  } catch (err) {
    console.error('GET /api/contactsubmissions/:id error:', err);
    if (err.kind === 'ObjectId' || err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid contact submission ID' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /api/contactsubmissions/ - create new
router.post('/', async (req, res) => {
  try {
    if (!validateContactSubmission(req.body)) {
      return res.status(400).json({ message: 'Invalid or missing fields in contact submission' });
    }
    const now = new Date();
    const submissionData = {
      name: req.body.name.trim(),
      email: req.body.email.trim(),
      phone: req.body.phone.trim(),
      message: req.body.message.trim(),
      submittedAt: req.body.submittedAt ? new Date(req.body.submittedAt) : now,
    };
    const submission = new ContactSubmission(submissionData);
    await submission.save();
    res.status(201).json(submission);
  } catch (err) {
    console.error('POST /api/contactsubmissions error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT /api/contactsubmissions/:id - update existing
router.put('/:id', async (req, res) => {
  try {
    if (!validateContactSubmission(req.body)) {
      return res.status(400).json({ message: 'Invalid or missing fields in contact submission' });
    }
    const updateData = {
      name: req.body.name.trim(),
      email: req.body.email.trim(),
      phone: req.body.phone.trim(),
      message: req.body.message.trim(),
      submittedAt: req.body.submittedAt ? new Date(req.body.submittedAt) : undefined,
    };
    // Remove undefined keys so we don't overwrite with undefined
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    const submission = await ContactSubmission.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!submission) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }
    res.json(submission);
  } catch (err) {
    console.error('PUT /api/contactsubmissions/:id error:', err);
    if (err.kind === 'ObjectId' || err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid contact submission ID' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE /api/contactsubmissions/:id - delete one
router.delete('/:id', async (req, res) => {
  try {
    const submission = await ContactSubmission.findByIdAndDelete(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }
    res.json({ message: 'Contact submission deleted' });
  } catch (err) {
    console.error('DELETE /api/contactsubmissions/:id error:', err);
    if (err.kind === 'ObjectId' || err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid contact submission ID' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;