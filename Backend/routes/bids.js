const express = require('express');
const router = express.Router();

const Bid = require('../models/Bid');
const Project = require('../models/Project');
const Contract = require('../models/Contract');
const { protect, requireRole } = require('../middleware/auth');

// Freelancer: place a bid on a project
router.post('/', protect, requireRole('Freelancer'), async (req, res) => {
  try {
    const { projectId, amount, duration, proposal } = req.body;

    if (!projectId || !amount || !proposal) {
      return res.status(400).json({ message: 'projectId, amount and proposal are required!' });
    }

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found!' });
    if (project.status !== 'Open') {
      return res.status(400).json({ message: 'This project is no longer accepting bids.' });
    }

    const existing = await Bid.findOne({ project: projectId, freelancer: req.user.id });
    if (existing) {
      return res.status(400).json({ message: 'You already placed a bid on this project.' });
    }

    const bid = await Bid.create({
      project: projectId,
      freelancer: req.user.id,
      amount,
      duration,
      proposal
    });

    res.status(201).json({ message: 'Bid placed successfully!', bid });
  } catch (err) {
    res.status(500).json({ message: 'Failed to place bid', error: err.message });
  }
});

// Client: view all bids on one of their projects
router.get('/project/:projectId', protect, requireRole('Client'), async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ message: 'Project not found!' });
    if (project.client.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You can only view bids on your own projects.' });
    }

    const bids = await Bid.find({ project: req.params.projectId })
      .populate('freelancer', 'name email profession skills image')
      .sort({ createdAt: -1 });

    res.status(200).json(bids);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bids', error: err.message });
  }
});

// Freelancer: view their own bids
router.get('/my', protect, requireRole('Freelancer'), async (req, res) => {
  try {
    const bids = await Bid.find({ freelancer: req.user.id })
      .populate({ path: 'project', populate: { path: 'client', select: 'name email' } })
      .sort({ createdAt: -1 });
    res.status(200).json(bids);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch your bids', error: err.message });
  }
});

// Client: accept a bid -> creates a Contract, rejects other bids, marks project In Progress
router.put('/:id/accept', protect, requireRole('Client'), async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id).populate('project');
    if (!bid) return res.status(404).json({ message: 'Bid not found!' });

    const project = bid.project;
    if (project.client.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You can only accept bids on your own projects.' });
    }
    if (project.status !== 'Open') {
      return res.status(400).json({ message: 'This project already has an accepted bid.' });
    }

    bid.status = 'Accepted';
    await bid.save();

    // Reject all other pending bids on this project
    await Bid.updateMany(
      { project: project._id, _id: { $ne: bid._id }, status: 'Pending' },
      { $set: { status: 'Rejected' } }
    );

    project.status = 'In Progress';
    await project.save();

    const contract = await Contract.create({
      project: project._id,
      bid: bid._id,
      client: req.user.id,
      freelancer: bid.freelancer,
      amount: bid.amount
    });

    res.status(200).json({ message: 'Bid accepted! Contract created.', bid, contract });
  } catch (err) {
    res.status(500).json({ message: 'Failed to accept bid', error: err.message });
  }
});

// Client: reject a specific bid
router.put('/:id/reject', protect, requireRole('Client'), async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id).populate('project');
    if (!bid) return res.status(404).json({ message: 'Bid not found!' });
    if (bid.project.client.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You can only reject bids on your own projects.' });
    }

    bid.status = 'Rejected';
    await bid.save();
    res.status(200).json({ message: 'Bid rejected.', bid });
  } catch (err) {
    res.status(500).json({ message: 'Failed to reject bid', error: err.message });
  }
});

// Freelancer: withdraw their own pending bid
router.delete('/:id', protect, requireRole('Freelancer'), async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id);
    if (!bid) return res.status(404).json({ message: 'Bid not found!' });
    if (bid.freelancer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You can only withdraw your own bids.' });
    }
    if (bid.status !== 'Pending') {
      return res.status(400).json({ message: 'Only pending bids can be withdrawn.' });
    }

    bid.status = 'Withdrawn';
    await bid.save();
    res.status(200).json({ message: 'Bid withdrawn.', bid });
  } catch (err) {
    res.status(500).json({ message: 'Failed to withdraw bid', error: err.message });
  }
});

// Client: applicant (bid) counts for each of their own projects -> { projectId: count }
router.get('/counts/mine', protect, requireRole('Client'), async (req, res) => {
  try {
    const myProjects = await Project.find({ client: req.user.id }).select('_id');
    const projectIds = myProjects.map((p) => p._id);

    const counts = await Bid.aggregate([
      { $match: { project: { $in: projectIds }, status: { $ne: 'Withdrawn' } } },
      { $group: { _id: '$project', count: { $sum: 1 } } }
    ]);

    const result = {};
    counts.forEach((c) => { result[c._id.toString()] = c.count; });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch applicant counts', error: err.message });
  }
});

module.exports = router;
