const express = require('express');
const router = express.Router();

const Contract = require('../models/Contract');
const Milestone = require('../models/Milestone');
const Project = require('../models/Project');
const { protect } = require('../middleware/auth');

// Logged-in user (client or freelancer): list contracts they're part of
router.get('/my', protect, async (req, res) => {
  try {
    const filter = req.user.role === 'Client'
      ? { client: req.user.id }
      : { freelancer: req.user.id };

    const contracts = await Contract.find(filter)
      .populate('project')
      .populate('client', 'name email')
      .populate('freelancer', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json(contracts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch contracts', error: err.message });
  }
});

// Single contract detail (only its client or freelancer can view)
router.get('/:id', protect, async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id)
      .populate('project')
      .populate('client', 'name email')
      .populate('freelancer', 'name email');

    if (!contract) return res.status(404).json({ message: 'Contract not found!' });

    const isParty = [contract.client._id.toString(), contract.freelancer._id.toString()].includes(req.user.id);
    if (!isParty) return res.status(403).json({ message: 'Not authorized to view this contract.' });

    res.status(200).json(contract);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch contract', error: err.message });
  }
});

// Client: mark contract completed (all milestones must be approved first)
router.put('/:id/complete', protect, async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (!contract) return res.status(404).json({ message: 'Contract not found!' });
    if (contract.client.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only the client can complete this contract.' });
    }

    const pendingMilestones = await Milestone.countDocuments({
      contract: contract._id,
      status: { $ne: 'Approved' }
    });
    if (pendingMilestones > 0) {
      return res.status(400).json({ message: 'All milestones must be approved before completing the contract.' });
    }

    contract.status = 'Completed';
    await contract.save();

    await Project.findByIdAndUpdate(contract.project, { status: 'Completed' });

    res.status(200).json({ message: 'Contract marked completed!', contract });
  } catch (err) {
    res.status(500).json({ message: 'Failed to complete contract', error: err.message });
  }
});

module.exports = router;
