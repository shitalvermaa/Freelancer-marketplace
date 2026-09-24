const express = require('express');
const router = express.Router();

const User = require('../models/User');

// Public: list all freelancers (for "Find Talent" page), optional category filter
router.get('/', async (req, res) => {
  try {
    const filter = { role: 'Freelancer' };
    if (req.query.category) filter.profession = new RegExp(req.query.category, 'i');

    const freelancers = await User.find(filter).select('name profession skills experience portfolioLink about image portfolio');
    res.status(200).json(freelancers);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch freelancers', error: err.message });
  }
});

module.exports = router;
