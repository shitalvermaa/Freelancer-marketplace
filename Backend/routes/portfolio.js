const express = require('express');
const router = express.Router();

const User = require('../models/User');
const { protect, requireRole } = require('../middleware/auth');

// Public: view a freelancer's portfolio + profile
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('name profession skills experience portfolioLink about image portfolio role');
    if (!user || user.role !== 'Freelancer') {
      return res.status(404).json({ message: 'Freelancer not found!' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch portfolio', error: err.message });
  }
});

// Freelancer: update own profile fields (name, profession, skills, experience, portfolioLink, about, image)
router.put('/profile', protect, requireRole('Freelancer'), async (req, res) => {
  try {
    const { name, profession, skills, experience, portfolioLink, about, image } = req.body;
    const update = {};
    if (name !== undefined) update.name = name;
    if (profession !== undefined) update.profession = profession;
    if (skills !== undefined) update.skills = skills;
    if (experience !== undefined) update.experience = experience;
    if (portfolioLink !== undefined) update.portfolioLink = portfolioLink;
    if (about !== undefined) update.about = about;
    if (image !== undefined) update.image = image;

    const user = await User.findByIdAndUpdate(req.user.id, update, { new: true }).select('-password');
    res.status(200).json({ message: 'Profile updated!', user });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update profile', error: err.message });
  }
});

// Freelancer: add a portfolio item
router.post('/item', protect, requireRole('Freelancer'), async (req, res) => {
  try {
    const { title, description, image, link } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required!' });

    const user = await User.findById(req.user.id);
    user.portfolio.push({ title, description, image, link });
    await user.save();

    res.status(201).json({ message: 'Portfolio item added!', portfolio: user.portfolio });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add portfolio item', error: err.message });
  }
});

// Freelancer: update a portfolio item
router.put('/item/:itemId', protect, requireRole('Freelancer'), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const item = user.portfolio.id(req.params.itemId);
    if (!item) return res.status(404).json({ message: 'Portfolio item not found!' });

    const { title, description, image, link } = req.body;
    if (title !== undefined) item.title = title;
    if (description !== undefined) item.description = description;
    if (image !== undefined) item.image = image;
    if (link !== undefined) item.link = link;

    await user.save();
    res.status(200).json({ message: 'Portfolio item updated!', portfolio: user.portfolio });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update portfolio item', error: err.message });
  }
});

// Freelancer: delete a portfolio item
router.delete('/item/:itemId', protect, requireRole('Freelancer'), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.portfolio = user.portfolio.filter(p => p._id.toString() !== req.params.itemId);
    await user.save();
    res.status(200).json({ message: 'Portfolio item deleted!', portfolio: user.portfolio });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete portfolio item', error: err.message });
  }
});

module.exports = router;
