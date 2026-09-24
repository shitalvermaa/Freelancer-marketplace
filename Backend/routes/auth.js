const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/User');
const { protect, JWT_SECRET } = require('../middleware/auth');

function signToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
}

function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    profession: user.profession,
    skills: user.skills,
    experience: user.experience,
    portfolioLink: user.portfolioLink,
    about: user.about,
    image: user.image,
    portfolio: user.portfolio
  };
}

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role, profession } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields (name, email, password, role) are required!' });
    }
    if (!['Client', 'Freelancer'].includes(role)) {
      return res.status(400).json({ message: 'Role must be Client or Freelancer.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }
    if (role === 'Freelancer' && !profession) {
      return res.status(400).json({ message: 'Please select or enter your speciality.' });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: 'This email is already registered!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
      profession: role === 'Client' ? 'Business Client' : profession
    });

    const token = signToken(newUser);

    res.status(201).json({
      message: 'Signup Successful!',
      token,
      user: publicUser(newUser)
    });
  } catch (err) {
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Both email and password are required!' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: 'User not found! Please signup first.' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials! Wrong password.' });
    }

    const token = signToken(user);

    res.status(200).json({
      message: 'Login Successful!',
      token,
      user: publicUser(user)
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});

// Returns the currently logged-in user (validates the token is still good)
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ user: publicUser(user) });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user', error: err.message });
  }
});

module.exports = router;
