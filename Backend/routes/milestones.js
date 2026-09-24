const express = require('express');
const router = express.Router();

const Milestone = require('../models/Milestone');
const Contract = require('../models/Contract');
const { protect } = require('../middleware/auth');

async function getContractOr403(contractId, userId) {
  const contract = await Contract.findById(contractId);
  if (!contract) return { error: 404, message: 'Contract not found!' };
  const isParty = [contract.client.toString(), contract.freelancer.toString()].includes(userId);
  if (!isParty) return { error: 403, message: 'Not authorized for this contract.' };
  return { contract };
}

// Client: create a milestone under a contract
router.post('/', protect, async (req, res) => {
  try {
    const { contractId, title, description, amount, dueDate } = req.body;
    if (!contractId || !title || !amount) {
      return res.status(400).json({ message: 'contractId, title and amount are required!' });
    }

    const contract = await Contract.findById(contractId);
    if (!contract) return res.status(404).json({ message: 'Contract not found!' });
    if (contract.client.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only the client can create milestones.' });
    }

    const milestone = await Milestone.create({ contract: contractId, title, description, amount, dueDate });
    res.status(201).json({ message: 'Milestone created!', milestone });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create milestone', error: err.message });
  }
});

// Either party on the contract: list milestones for a contract
router.get('/contract/:contractId', protect, async (req, res) => {
  try {
    const result = await getContractOr403(req.params.contractId, req.user.id);
    if (result.error) return res.status(result.error).json({ message: result.message });

    const milestones = await Milestone.find({ contract: req.params.contractId }).sort({ createdAt: 1 });
    res.status(200).json(milestones);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch milestones', error: err.message });
  }
});

// Freelancer: submit work for a milestone
router.put('/:id/submit', protect, async (req, res) => {
  try {
    const milestone = await Milestone.findById(req.params.id).populate('contract');
    if (!milestone) return res.status(404).json({ message: 'Milestone not found!' });
    if (milestone.contract.freelancer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only the assigned freelancer can submit this milestone.' });
    }
    if (milestone.status === 'Approved') {
      return res.status(400).json({ message: 'This milestone is already approved.' });
    }

    const { submissionNote, submissionFile } = req.body;
    milestone.submissionNote = submissionNote || milestone.submissionNote;
    if (submissionFile) milestone.submissionFile = submissionFile;
    milestone.status = 'Submitted';
    await milestone.save();

    res.status(200).json({ message: 'Work submitted for review!', milestone });
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit milestone', error: err.message });
  }
});

// Client: approve submitted work
router.put('/:id/approve', protect, async (req, res) => {
  try {
    const milestone = await Milestone.findById(req.params.id).populate('contract');
    if (!milestone) return res.status(404).json({ message: 'Milestone not found!' });
    if (milestone.contract.client.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only the client can approve this milestone.' });
    }
    if (milestone.status !== 'Submitted') {
      return res.status(400).json({ message: 'Only submitted milestones can be approved.' });
    }

    milestone.status = 'Approved';
    await milestone.save();
    res.status(200).json({ message: 'Milestone approved!', milestone });
  } catch (err) {
    res.status(500).json({ message: 'Failed to approve milestone', error: err.message });
  }
});

// Client: reject submitted work, request revision
router.put('/:id/reject', protect, async (req, res) => {
  try {
    const milestone = await Milestone.findById(req.params.id).populate('contract');
    if (!milestone) return res.status(404).json({ message: 'Milestone not found!' });
    if (milestone.contract.client.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Only the client can reject this milestone.' });
    }
    if (milestone.status !== 'Submitted') {
      return res.status(400).json({ message: 'Only submitted milestones can be rejected.' });
    }

    milestone.status = 'Rejected';
    milestone.feedback = req.body.feedback || '';
    await milestone.save();
    res.status(200).json({ message: 'Milestone sent back for revision.', milestone });
  } catch (err) {
    res.status(500).json({ message: 'Failed to reject milestone', error: err.message });
  }
});

module.exports = router;
