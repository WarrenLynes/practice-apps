const router = require('express').Router();

module.exports.wordRoutes = function (db) {
  router.post('/', async function (req, res) {
    const { word, definition } = req.body;
    const userId = req.userId;

    if (!word || !definition)
      return res.sendStatus('500');

    try {
      const newWord = await new db.Words({
        word, definition, userId
      }).save();
      res.status(201).send();
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  router.get('/', async function (req, res) {
    const userId = req.userId;
    let query = { userId };
    let page = Number(req.query.skip) || 0;

    if (req.query.q)
      query['word'] = new RegExp(req.query.q, 'i');

    const data = await db.Words
      .find(query)
      .sort('-createdAt')
      .skip(page)
      .limit(10)
      .exec();

    const total = await db.Words
      .find({ userId })
      .count();

    res.send({ page, total, data })
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
      const result = await db.Words.deleteOne({ _id: req.params.id, userId: req.userId });
      res.send(result);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  return router;
}