const express = require('express');
const router = express.Router();

const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');

// Logged-in user: upload a single file (portfolio image, work submission, etc.)
// Returns a URL that can be stored on a Project/Portfolio/Milestone document.
router.post('/', protect, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded!' });

  const fileUrl = `/uploads/${req.file.filename}`;
  res.status(201).json({ message: 'File uploaded!', url: fileUrl, filename: req.file.filename });
});

module.exports = router;
