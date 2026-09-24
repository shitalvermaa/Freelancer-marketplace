const express = require('express');
const router = express.Router();

const Project = require('../models/Project');
const { protect, requireRole } = require('../middleware/auth');

// Public: list all projects (optionally filter by category/status)
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.status) filter.status = req.query.status;

    const projects = await Project.find(filter)
      .populate('client', 'name email profession')
      .sort({ createdAt: -1 });

    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch projects', error: err.message });
  }
});

// Public: single project detail
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('client', 'name email profession');
    if (!project) return res.status(404).json({ message: 'Project not found!' });
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch project', error: err.message });
  }
});

// Client only: post a new project
router.post('/', protect, requireRole('Client'), async (req, res) => {
  try {
    const { title, category, budget, duration, description, image } = req.body;

    if (!title || !category || !budget || !duration) {
      return res.status(400).json({ message: 'Title, category, budget and duration are required!' });
    }

    const project = await Project.create({
      title, category, budget, duration, description, image,
      client: req.user.id
    });

    res.status(201).json({ message: 'Project added successfully!', project });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create project', error: err.message });
  }
});

// Client only, own project: update
router.put('/:id', protect, requireRole('Client'), async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found!' });
    if (project.client.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You can only edit your own projects.' });
    }

    const { title, category, budget, duration, description, status, image } = req.body;
    if (title) project.title = title;
    if (category) project.category = category;
    if (budget) project.budget = budget;
    if (duration) project.duration = duration;
    if (description) project.description = description;
    if (status) project.status = status;
    if (image) project.image = image;

    await project.save();
    res.status(200).json({ message: 'Project updated successfully!', project });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update project', error: err.message });
  }
});

// Client only, own project: delete
router.delete('/:id', protect, requireRole('Client'), async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found!' });
    if (project.client.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You can only delete your own projects.' });
    }

    await project.deleteOne();
    res.status(200).json({ message: 'Project deleted successfully!', deletedId: req.params.id });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete project', error: err.message });
  }
});

// Client only: projects posted by the logged-in client
router.get('/mine/list', protect, requireRole('Client'), async (req, res) => {
  try {
    const projects = await Project.find({ client: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch your projects', error: err.message });
  }
});

module.exports = router;
