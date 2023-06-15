const mongoose = require("mongoose");
const { loremIpsum } = require("lorem-ipsum");
const db = mongoose.connect('mongodb://127.0.0.1:27017/glossary');
const { getWords } = require('../getWords.js');

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


/* getWords()
  .then((x) => {
    console.log(x);
    exports.Words.create(x)
  }) */
/* for (var i = 0; i < 500; i++) {
  exports.Words.create({
    word: String(Math.random() * 100) + loremIpsum({ count: 1, units: 'words' }),
    definition: String(loremIpsum({ count: 1 }))
  });
} */

