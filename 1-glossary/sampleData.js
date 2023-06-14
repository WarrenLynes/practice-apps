const fs = require('fs');
const { MongoClient } = require('mongodb');
const filePath = '/usr/share/dict/words';

const dbUrl = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(dbUrl);

async function main() {
  await client.connect();
  const db = client.db('glossary');
  const wordsCollection = db.collection('words');
  await wordsCollection.drop();
  const words = await getWords();

  return wordsCollection.insertMany(words)
    .then((res) =>
      wordsCollection.find().toArray()
    )
    .then((res) => {
      console.log(res.length);
      process.exit();
    });
}

function getWords() {
  return new Promise((res, rej) => {
    fs.readFile(filePath, (err, data) => {
      data = String(data).split('\n');
      const words = [];

      for (var x = 0; x < 100; x++) {
        const word = {
          word: '',
          definition: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }

        word.word = data[Math.floor(Math.random() * data.length - 1)];

        for (var i = 0; i < Math.floor(Math.random() * 30); i++) {
          word.definition += data[Math.floor(Math.random() * data.length - 1)] + ' ';
        }

        words.push(word)
      }
      res(words);
    });
  });
}

main();
