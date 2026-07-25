const mongoose = require('mongoose');

const ContactSubmissionSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, required: false, trim: true, default: '' },
  message: { type: String, required: true, trim: true },
  submittedAt: { type: Date, required: true, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('ContactSubmission', ContactSubmissionSchema);