const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  url: String,
  sender: { type: String, required: false },
  receiver: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('File', fileSchema);