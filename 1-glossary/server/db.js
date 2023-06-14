const mongoose = require("mongoose");
const db = mongoose.connect('mongodb://127.0.0.1:27017/glossary');

const wordSchema = new mongoose.Schema({
  word: {
    type: String,
    unique: true,
    required: true
  },
  definition: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports.Words = mongoose.model('Words', wordSchema);

