const router = require('express').Router();

module.exports.wordRoutes = function (db) {
  router.post('/', async function (req, res) {
    const { word, definition } = req.body;
    if (!word || !definition)
      return res.sendStatus('500');

    try {
      const newWord = await new db.Words({
        word, definition
      }).save();
      res.status(201).send();
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  router.get('/', async function (req, res) {
    const words = await db.Words.find().sort('-updatedAt').exec();
    res.send(words);
  });

  router.put('/:id', async function (req, res) {
    try {
      const word = await db.Words.findById(req.params.id);
      word.word = req.body.word;
      word.definition = req.body.definition;
      await word.save();
      res.send(word);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  })

  router.delete('/:id', async function (req, res) {
    try {
      const result = await db.Words.deleteOne({ _id: req.params.id });
      res.send(result);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  return router;
}