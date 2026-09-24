const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  budget: { type: String, required: true },
  duration: { type: String, required: true },
  description: { type: String, default: "" },
  image: { type: String, default: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600" },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['Open', 'In Progress', 'Completed', 'Cancelled'], default: 'Open' }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
