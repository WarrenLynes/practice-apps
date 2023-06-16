const mongoose = require("mongoose");
const { loremIpsum } = require("lorem-ipsum");
const { getWords } = require('../getWords.js');
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
  },
  userId: {
    type: mongoose.ObjectId,
    ref: 'Users',
    required: true
  }
}, { timestamps: true });


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const sessionSchema = new mongoose.Schema({
  hash: {
    type: String,
    required: true,
    unique: true
  },
  userId: { type: mongoose.ObjectId, ref: 'Users' }
});

module.exports.Words = mongoose.model('Words', wordSchema);
module.exports.Users = mongoose.model('Users', userSchema);
module.exports.Sessions = mongoose.model('Sessions', sessionSchema);
/*
function initializeData(userId) {
  getWords(500)
    .then((wds) =>
      wds.map((wd) => ({ ...wd, userId }))
    )
    .then((x) => {
      console.log(x);
      exports.Words.create(x)
    })
}
initializeData('648b8d7369af65e36d148ac9'); */
