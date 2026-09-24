const mongoose = require('mongoose');

const portfolioItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  image: { type: String, default: "" },
  link: { type: String, default: "" }
}, { _id: true, timestamps: true });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true }, // stored hashed (bcrypt)
  role: { type: String, enum: ['Client', 'Freelancer'], required: true },
  profession: { type: String, default: "" },
  skills: [{ type: String }],
  experience: { type: String, default: "" },
  portfolioLink: { type: String, default: "" },
  about: { type: String, default: "" },
  image: { type: String, default: "" },
  portfolio: [portfolioItemSchema]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
