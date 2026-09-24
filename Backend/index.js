require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const connectDB = require('./config/db');

const app = express();

app.use(express.json());
app.use(cors());

// Serve uploaded files (portfolio images, milestone submissions) statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB before accepting traffic
connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/bids', require('./routes/bids'));
app.use('/api/contracts', require('./routes/contracts'));
app.use('/api/milestones', require('./routes/milestones'));
app.use('/api/portfolio', require('./routes/portfolio'));
app.use('/api/freelancers', require('./routes/freelancers'));
app.use('/api/upload', require('./routes/upload'));

app.get('/', (req, res) => {
  res.send('Freelancer Marketplace Server is live and running');
});

// Generic error handler (e.g. multer file-type/size errors)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Something went wrong' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
