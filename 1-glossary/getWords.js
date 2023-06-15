const fs = require('fs');

module.exports.getWords = function () {
  return new Promise((res, rej) => {
    fs.readFile('/usr/share/dict/words', 'utf8', (err, data) => {
      data = data.split('\n');
      const words = [];

      for (var x = 0; x < 100; x++) {
        const word = {
          word: '',
          definition: 'definition',
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