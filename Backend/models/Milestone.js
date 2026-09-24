const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
  contract: { type: mongoose.Schema.Types.ObjectId, ref: 'Contract', required: true },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  amount: { type: Number, required: true },
  dueDate: { type: Date },
  status: {
    type: String,
    enum: ['Pending', 'Submitted', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  submissionNote: { type: String, default: "" },
  submissionFile: { type: String, default: "" }, // file url from /api/upload
  feedback: { type: String, default: "" } // client's feedback on rejection
}, { timestamps: true });

module.exports = mongoose.model('Milestone', milestoneSchema);
