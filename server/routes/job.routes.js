const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// GET /api/jobs - list all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ postedDate: -1 });
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Server error fetching jobs' });
  }
});

// GET /api/jobs/:id - get job by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid job ID format' });
    }
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ message: 'Server error fetching job' });
  }
});

// POST /api/jobs - create a new job
router.post('/', async (req, res) => {
  try {
    const { title, location, type, description, requirements, postedDate } = req.body;
    if (
      typeof title !== 'string' ||
      typeof location !== 'string' ||
      typeof type !== 'string' ||
      typeof description !== 'string' ||
      typeof requirements !== 'string'
    ) {
      return res.status(400).json({ message: 'All required fields must be valid strings' });
    }
    const postedDateValue = postedDate ? new Date(postedDate) : new Date();
    if (isNaN(postedDateValue.getTime())) {
      return res.status(400).json({ message: 'Invalid postedDate' });
    }
    const newJob = new Job({
      title: title.trim(),
      location: location.trim(),
      type: type.trim(),
      description: description.trim(),
      requirements: requirements.trim(),
      postedDate: postedDateValue,
    });
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ message: 'Server error creating job' });
  }
});

// PUT /api/jobs/:id - update a job by id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid job ID format' });
    }
    const { title, location, type, description, requirements, postedDate } = req.body;

    const updateData = {};
    if (title !== undefined) {
      if (typeof title !== 'string' || !title.trim()) {
        return res.status(400).json({ message: 'Field "title" must be a non-empty string' });
      }
      updateData.title = title.trim();
    }
    if (location !== undefined) {
      if (typeof location !== 'string' || !location.trim()) {
        return res.status(400).json({ message: 'Field "location" must be a non-empty string' });
      }
      updateData.location = location.trim();
    }
    if (type !== undefined) {
      if (typeof type !== 'string' || !type.trim()) {
        return res.status(400).json({ message: 'Field "type" must be a non-empty string' });
      }
      updateData.type = type.trim();
    }
    if (description !== undefined) {
      if (typeof description !== 'string' || !description.trim()) {
        return res.status(400).json({ message: 'Field "description" must be a non-empty string' });
      }
      updateData.description = description.trim();
    }
    if (requirements !== undefined) {
      if (typeof requirements !== 'string' || !requirements.trim()) {
        return res.status(400).json({ message: 'Field "requirements" must be a non-empty string' });
      }
      updateData.requirements = requirements.trim();
    }
    if (postedDate !== undefined) {
      const postedDateValue = new Date(postedDate);
      if (isNaN(postedDateValue.getTime())) {
        return res.status(400).json({ message: 'Invalid "postedDate"' });
      }
      updateData.postedDate = postedDateValue;
    }

    const updatedJob = await Job.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(updatedJob);
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ message: 'Server error updating job' });
  }
});

// DELETE /api/jobs/:id - delete a job by id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid job ID format' });
    }
    const deletedJob = await Job.findByIdAndDelete(id);
    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ message: 'Server error deleting job' });
  }
});

module.exports = router;